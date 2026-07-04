import type { ReviewContext } from '../types/ReviewContext';

export class KnowledgeRouter {
  /**
   * Scans target file for patterns, emits signals, and routes to corresponding knowledge files.
   */
  public routeKnowledge(context: ReviewContext): string[] {
    const files: string[] = [];
    const content = context.targetFile.content;
    const frameworkBehaviorContext = this.isFrameworkBehaviorContext(context.targetFile.filePath, content);

    // Framework-specific base load
    if (context.targetFile.detectedFramework === 'Playwright') {
      files.push('knowledge/playwright/README.md');
    }

    // Stop Loading Rule: If not a supported framework, stop loading rules
    if (context.targetFile.detectedFramework === 'Unknown') {
      return [];
    }

    const signals = new Set<string>();

    // 1. Signal: Locator (XPath, CSS, locator calls)
    if (content.includes('xpath=') || content.includes('//') || content.includes('nth-child') || content.includes('locator(')) {
      signals.add('Locator');
    }

    // 2. Signal: Timeout (waitForTimeout, sleeps)
    if (content.includes('waitForTimeout') || content.includes('page.waitForTimeout') || content.includes('waitForLoadState')) {
      signals.add('Timeout');
    }

    // 3. Signal: Isolation (global mutables or session shares)
    if (this.hasTopLevelMutableState(content) || content.includes('browser.newContext(')) {
      signals.add('Isolation');
    }

    // 4. Signal: Assertion (Check if assertions are missing or weak)
    if (!this.hasAssertionSignal(content) && !frameworkBehaviorContext) {
      signals.add('Assertion');
    }

    // Map Signals to Knowledge files
    if (signals.has('Locator')) {
      files.push('knowledge/playwright/review-rules/locator-review.md');
      files.push('knowledge/playwright/fundamentals/locators.md');
      files.push('knowledge/google/maintainability.md');
    }

    if (signals.has('Timeout')) {
      files.push('knowledge/playwright/review-rules/waiting-review.md');
      files.push('knowledge/playwright/fundamentals/auto-waiting.md');
      files.push('knowledge/google/flaky-tests.md');
    }

    if (signals.has('Isolation')) {
      files.push('knowledge/playwright/review-rules/isolation-review.md');
      files.push('knowledge/playwright/review-rules/parallel-review.md');
      files.push('knowledge/google/test-isolation.md');
    }

    if (signals.has('Assertion')) {
      files.push('knowledge/playwright/review-rules/assertion-review.md');
      files.push('knowledge/playwright/fundamentals/assertions.md');
    }

    // Feature-specific routing
    if (context.targetFile.detectedFeature === 'Authentication') {
      files.push('knowledge/owasp/authentication-testing.md');
      files.push('knowledge/istqb/boundary-value-analysis.md');
    } else if (context.targetFile.detectedFeature === 'Search') {
      files.push('knowledge/owasp/input-validation.md');
      files.push('knowledge/unicode/unicode-testing.md');
    }

    return files;
  }

  private hasTopLevelMutableState(content: string): boolean {
    let braceDepth = 0;
    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (braceDepth === 0 && /^let\s+[a-zA-Z0-9_]+\s*=/.test(trimmed)) {
        return true;
      }
      braceDepth += (line.match(/\{/g) || []).length;
      braceDepth -= (line.match(/\}/g) || []).length;
      if (braceDepth < 0) braceDepth = 0;
    }
    return false;
  }

  private hasAssertionSignal(content: string): boolean {
    return [
      /\bexpect\s*\(/,
      /\bassert\w*\s*\./,
      /\bassert\w*\s*\(/,
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
    ].some(pattern => pattern.test(content));
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
}
