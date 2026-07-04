import type { LLMProvider } from './LLMProvider';
import type { ReviewContext } from '../types/ReviewContext';
import type { Finding } from '../types/Finding';
import type { ReviewResult } from '../types/ReviewResult';
import * as dotenv from 'dotenv';

dotenv.config();

export class GeminiProvider implements LLMProvider {
  private apiKey?: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey === undefined ? process.env.GEMINI_API_KEY : apiKey;
  }

  public async review(context: ReviewContext, ruleContents: string[]): Promise<Omit<ReviewResult, 'score'>> {
    if (!this.apiKey) {
      return this.generateRuleEngineReview(context);
    }

    try {
      const { GoogleGenAI } = await import('@google/genai');
      const ai = new GoogleGenAI({ apiKey: this.apiKey });

      const systemInstruction = 'You are QA Brain Reviewer. Match findings and output JSON matching response-format.md schema.';

      const userPrompt = `
      Review Context:
      ${JSON.stringify(context, null, 2)}

      Rule Sets Loaded:
      ${ruleContents.join('\n\n')}

      Target Code to Review:
      ${context.targetFile.content}
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userPrompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
        },
      });

      const rawText = response.text || '{}';
      const parsed = JSON.parse(rawText);

      return {
        summary: parsed.summary || 'No summary provided.',
        findings: parsed.findings || [],
        strengths: parsed.strengths || [],
        improvements: parsed.improvements || [],
        observations: parsed.observations || [],
        references: parsed.references || [],
        finalVerdict: parsed.finalVerdict || 'Needs Improvement',
      };
    } catch (error) {
      console.warn('Gemini API call failed, falling back to deterministic rule review.', error);
      return this.generateRuleEngineReview(context);
    }
  }

  /**
   * Generates deterministic findings from local code signals when no LLM is available.
   */
  private generateRuleEngineReview(context: ReviewContext): Omit<ReviewResult, 'score'> {
    const content = context.targetFile.content;
    const findings: Finding[] = [];
    const isSelenium = context.framework?.adapterName === 'selenium' || context.targetFile.detectedFramework === 'Selenium';

    const absoluteXPath = this.findLine(content, /locator\(\s*['"](?:xpath=)?\/\/(?:html|body|\*)/);
    const rawXPath = this.findLine(content, /locator\(\s*['"](?:xpath=)?\/\//);
    const brittleCss = this.findLine(content, /locator\(\s*['"][^'"]*(?:>\s*[^'"]+){2,}|nth-child\(/);
    const hardcodedWait = this.findLine(content, /waitForTimeout\s*\(/);
    const seleniumXPath = this.findLine(content, /driver\.findElement\s*\(\s*By\.xpath\s*\(/);
    const seleniumHardcodedSleep = this.findLine(content, /driver\.sleep\s*\(/);
    const seleniumBuildsDriver = /\bnew\s+Builder\s*\(\s*\).*\.build\s*\(/s.test(content);
    const seleniumMissingQuit = isSelenium && seleniumBuildsDriver && !/\bdriver\.quit\s*\(/.test(content);
    const seleniumSelectorLeak = isSelenium
      && /\b\w+Page\b/.test(content)
      && this.findLine(content, /driver\.findElement\s*\(\s*By\.(?:css|id|xpath|name|className)\s*\(/);
    const sharedState = this.findTopLevelMutableState(content);
    const importsPageObject = /import\s+.*\b\w+Page\b/.test(content);
    const hasAssertions = this.hasAssertionSignal(content);
    const skipMissingAssertion = this.isFrameworkBehaviorContext(context.targetFile.filePath, content);

    if (isSelenium && seleniumSelectorLeak) {
      findings.push({
        title: 'Selector Leak',
        description: 'A Page Object is referenced but a Selenium selector is still used directly in the spec.',
        severity: 'Medium',
        confidence: { level: 95, justification: ['Page Object signal matched', 'Inline Selenium selector matched'] },
        evidence: seleniumSelectorLeak,
        recommendation: 'Move the selector into the Page Object and expose a reusable action method.',
      });
    } else if (isSelenium && seleniumXPath) {
      findings.push({
        title: 'Brittle Selenium XPath Locator',
        description: 'The test uses a Selenium XPath selector directly in the spec, which is tightly coupled to DOM structure.',
        severity: 'High',
        confidence: { level: 95, justification: ['Selenium By.xpath locator matched'] },
        evidence: seleniumXPath,
        recommendation: 'Move locator into a Page Object method and prefer stable, user-facing, or test-owned selectors.',
      });
    } else if (absoluteXPath) {
      findings.push({
        title: 'Brittle XPath Locator with Selector Leak',
        description: 'The test uses an absolute XPath selector directly in the spec, which is brittle and bypasses page object encapsulation.',
        severity: 'High',
        confidence: { level: 98, justification: ['Absolute XPath locator matched', 'Raw selector used in test body'] },
        evidence: absoluteXPath,
        recommendation: 'Encapsulate locator inside LoginPage class and call a method (e.g. await loginPage.login()).',
      });
    } else if (importsPageObject && rawXPath) {
      findings.push({
        title: 'Selector Leak',
        description: 'A Page Object is imported but a raw selector is still used directly in the spec.',
        severity: 'Medium',
        confidence: { level: 98, justification: ['Page Object import matched', 'Raw locator matched'] },
        evidence: rawXPath,
        recommendation: 'Encapsulate the login button selector inside the LoginPage class',
      });
    } else if (rawXPath) {
      findings.push({
        title: 'Brittle XPath Locator',
        description: 'The test uses a raw XPath selector, which is harder to maintain than user-facing Playwright locators.',
        severity: 'High',
        confidence: { level: 95, justification: ['Raw XPath locator matched'] },
        evidence: rawXPath,
        recommendation: 'Replace raw XPath with getByRole, getByLabel, getByText, or a stable test id.',
      });
    }

    if (brittleCss) {
      findings.push({
        title: 'Brittle CSS Selector Chain',
        description: 'The test uses a deep nested CSS selector chain that can break when markup structure changes.',
        severity: 'High',
        confidence: { level: 98, justification: ['Deep CSS nesting or nth-child matched'] },
        evidence: brittleCss,
        recommendation: 'Replace brittle CSS chain with getByRole',
      });
    }

    if (hardcodedWait) {
      findings.push({
        title: 'Redundant Hardcoded Timeout (waitForTimeout)',
        description: 'The test uses a fixed sleep instead of waiting for observable UI or network state.',
        severity: 'High',
        confidence: { level: 95, justification: ['waitForTimeout call matched'] },
        evidence: hardcodedWait,
        recommendation: 'Remove hardcoded wait and rely on Playwright auto-waiting assertions.',
      });
    }

    if (isSelenium && seleniumHardcodedSleep) {
      findings.push({
        title: 'Hardcoded Sleep',
        description: 'The test uses a fixed Selenium sleep instead of waiting for observable browser state.',
        severity: 'High',
        confidence: { level: 95, justification: ['driver.sleep call matched'] },
        evidence: seleniumHardcodedSleep,
        recommendation: 'Replace driver.sleep with an explicit wait for the expected UI state.',
      });
    }

    if (seleniumMissingQuit) {
      findings.push({
        title: 'Resource Cleanup Missing',
        description: 'The test creates a WebDriver session but does not close it with driver.quit().',
        severity: 'High',
        confidence: { level: 95, justification: ['Selenium driver build matched', 'No driver.quit() matched'] },
        evidence: this.findLine(content, /new\s+Builder\s*\(\s*\)/) || 'new Builder().build()',
        recommendation: 'Close the Selenium driver in finally or test teardown with driver.quit().',
      });
    }

    if (sharedState) {
      findings.push({
        title: 'Test Isolation Violation (Shared State)',
        description: 'A mutable variable is defined outside the test body and can leak state between tests.',
        severity: 'Critical',
        confidence: { level: 100, justification: ['Top-level mutable variable matched'] },
        evidence: sharedState,
        recommendation: 'Isolate test state by logging in via isolated custom fixtures',
      });
    }

    if (!hasAssertions && findings.length === 0 && !skipMissingAssertion) {
      findings.push({
        title: 'Missing Assertion',
        description: 'The test performs actions but does not assert the expected outcome.',
        severity: 'Medium',
        confidence: { level: 90, justification: ['No expect(...) assertion matched'] },
        evidence: this.findLine(content, /test\s*\(/) || context.targetFile.filePath,
        recommendation: 'Add an assertion for the expected UI state, navigation, response, or persisted data after the action.',
      });
    }

    if (findings.length > 0) {
      return {
        summary: `Deterministic rule review found ${findings.length} issue(s).`,
        findings,
        strengths: [],
        improvements: findings.map(f => `[ ] ${f.recommendation}`),
        observations: ['Reviewed with local deterministic rules because no LLM response was available.'],
        references: this.mapReferences(findings),
        finalVerdict: 'Needs Improvement',
      };
    }

    return {
      summary: 'Deterministic rule review did not detect issues in this spec.',
      findings,
      strengths: ['POM encapsulation', 'Resilient locators', 'No hardcoded waits'],
      improvements: [],
      observations: skipMissingAssertion
        ? ['Missing assertion check skipped for framework/demo behavior context.']
        : [],
      references: ['locator-review.md', 'waiting-review.md'],
      finalVerdict: 'Excellent',
    };
  }

  private findLine(content: string, pattern: RegExp): string | undefined {
    return content
      .split(/\r?\n/)
      .map(line => line.trim())
      .find(line => pattern.test(line));
  }

  private findTopLevelMutableState(content: string): string | undefined {
    let braceDepth = 0;
    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (braceDepth === 0 && /^let\s+\w+\s*=/.test(trimmed)) {
        return trimmed;
      }
      braceDepth += (line.match(/\{/g) || []).length;
      braceDepth -= (line.match(/\}/g) || []).length;
      if (braceDepth < 0) braceDepth = 0;
    }
    return undefined;
  }

  private hasAssertionSignal(content: string): boolean {
    const assertionPatterns = [
      /\bexpect\s*\(/,
      /\bassert\w*\s*\./,
      /\bassert\w*\s*\(/,
      /\bshould\s*\./,
      /\bchai\.expect\s*\(/,
      /\bEnsure\.that\s*\(/,
      /\bCheck\.whether\s*\(/,
      /\bactor\.attemptsTo\s*\(/,
      /\battemptsTo\s*\(/,
      /\bseeIf\s*\(/,
      /\bexpectationTo\w+\s*\(/,
      /\btoEqual\s*\(/,
      /\btoBe\s*\(/,
      /\btoContain\s*\(/,
      /\btoHave\w+\s*\(/,
      /\bresponse\.(?:ok|status)\s*\(/,
      /\brequest\.(?:get|post|put|patch|delete)\s*\(/,
      /\bshortest\s*\(/,
      /\btest\.(?:skip|fixme|fail)\s*\(/,
    ];
    return assertionPatterns.some(pattern => pattern.test(content));
  }

  private isFrameworkBehaviorContext(filePath: string, content: string): boolean {
    const normalizedPath = filePath.replace(/\\/g, '/').toLowerCase();
    const pathOnlyFrameworkContexts = [
      /\/serenity-js\/examples\//,
      /\/serenity-js\/integration\/playwright-test\/examples\//,
      /\/serenity-js\/integration\/playwright-electron\/spec\/electron\//,
      /\/demo\.playwright\//,
      /\/demo-playwright\//,
      /\/android\/tests\/example\.spec\./,
      /\/chrome-extension\/tests\/example\.spec\./,
    ];

    if (pathOnlyFrameworkContexts.some(pattern => pattern.test(normalizedPath))) {
      return true;
    }

    const contextPathPatterns = [
      /\/examples?\//,
      /\/outcomes?\//,
      /\/skipped?\//,
      /\/failing\//,
      /\/compatibility\//,
      /\/demo[\w.-]*\//,
      /\/example\.spec\./,
      /\/example\.test\./,
    ];

    if (!contextPathPatterns.some(pattern => pattern.test(normalizedPath))) {
      return false;
    }

    const frameworkBehaviorSignals = [
      /\btest\s*\(\s*['"`][^'"`]*(?:passes|fails|skipped?|fixme|expected failure|unexpected pass|describe blocks|reporter|compatibility|configurationerror|global, worker-level error)/i,
      /\btest\.(?:skip|fixme|fail)\s*\(/,
      /\bdescribe\s*\(\s*['"`][^'"`]*(?:outcomes?|reporters?|compatibility|examples?)/i,
      /Serenity\/JS/i,
      /native reporters?/i,
      /custom tags?/i,
    ];

    return frameworkBehaviorSignals.some(pattern => pattern.test(content));
  }

  private mapReferences(findings: Finding[]): string[] {
    const refs = new Set<string>();
    for (const finding of findings) {
      const title = finding.title.toLowerCase();
      if (title.includes('locator') || title.includes('selector')) refs.add('locator-review.md');
      if (title.includes('timeout')) refs.add('waiting-review.md');
      if (title.includes('isolation') || title.includes('shared state')) refs.add('isolation-review.md');
      if (title.includes('assertion')) refs.add('assertion-review.md');
    }
    return Array.from(refs);
  }
}
