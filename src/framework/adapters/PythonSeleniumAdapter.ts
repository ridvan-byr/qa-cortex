import type {
  FrameworkAdapter,
  FrameworkContext,
  FrameworkDetectionInput,
  FrameworkSignal,
  KnowledgeProfile,
} from '../types';
import { getBaseKnowledgeFiles, getKnowledgeFilesForSignals } from '../KnowledgeProfiles';
import { hasAssertionSignal } from '../../utils/assertionHelper';

export class PythonSeleniumAdapter implements FrameworkAdapter {
  public readonly name = 'selenium' as const;

  public detect(input: FrameworkDetectionInput): boolean {
    const file = input.targetFile.filePath;
    const content = input.targetFile.content;
    
    // File must be a Python file
    if (!file.endsWith('.py')) {
      return false;
    }
    
    const lower = content.toLowerCase();
    return lower.includes('selenium')
      || lower.includes('webdriver')
      || lower.includes('pytest')
      || lower.includes('unittest');
  }

  public buildContext(input: FrameworkDetectionInput): FrameworkContext {
    return {
      framework: 'selenium',
      targetFile: input.targetFile,
      metadata: {
        detectedFeature: input.targetFile.detectedFeature,
        language: 'python'
      },
    };
  }

  public buildSignals(context: FrameworkContext): FrameworkSignal[] {
    const rawContent = context.targetFile.content;
    const file = context.targetFile.filePath;
    const signals: FrameworkSignal[] = [];

    // Clean content by replacing comment lines with empty lines (preserving line numbers)
    const cleanLines = rawContent.split(/\r?\n/).map(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('#')) return '';
      // Handle inline comments if they don't contain quotes
      if (trimmed.includes('#') && !trimmed.includes('"') && !trimmed.includes("'")) {
        return line.split('#')[0];
      }
      return line;
    });
    const content = cleanLines.join('\n');

    // 1. Brittle Locator Check
    if (content.includes('By.XPATH') || content.includes('find_element_by_xpath')) {
      signals.push(this.signal('locator', file, this.findLine(rawContent, /By\.XPATH|find_element_by_xpath/), ['locator', 'maintainability']));
    }

    // 2. Hardcoded Wait Check
    if (content.includes('time.sleep')) {
      signals.push(this.signal('wait', file, this.findLine(rawContent, /time\.sleep/), ['waiting', 'flakiness']));
    }

    // 3. Resource Cleanup Check (driver.quit())
    const buildsDriver = /webdriver\.(?:Chrome|Firefox|Edge|Safari|Remote|WebKit|Ie|Chromium|Opera)\s*\(/i.test(content);
    const hasQuit = /\.quit\s*\(/i.test(content);
    if (buildsDriver && !hasQuit) {
      signals.push(this.signal('lifecycle', file, this.findLine(rawContent, /webdriver\.(?:Chrome|Firefox|Edge|Safari|Remote|WebKit|Ie|Chromium|Opera)/i), ['cleanup', 'lifecycle']));
    }

    // 4. Missing Assertion Check (No assertion statements)
    const hasAssert = this.hasAssertionSignal(content);
    if (!hasAssert) {
      signals.push(this.signal('assertion', file, this.findLine(rawContent, /def\s+test_\w+/), ['assertion']));
    }

    return signals;
  }

  public knowledgeProfile(signals: FrameworkSignal[]): KnowledgeProfile {
    const routingSignals = new Set<string>();

    for (const signal of signals) {
      if (signal.ruleHints.includes('locator')) routingSignals.add('Locator');
      if (signal.ruleHints.includes('waiting')) routingSignals.add('Timeout');
      if (signal.ruleHints.includes('cleanup')) routingSignals.add('Cleanup');
      if (signal.ruleHints.includes('assertion')) routingSignals.add('Assertion');
    }

    return {
      baseKnowledgeFiles: getBaseKnowledgeFiles('selenium'),
      ruleFiles: getKnowledgeFilesForSignals('selenium', routingSignals),
      genericKnowledgeFiles: [],
    };
  }

  private signal(type: FrameworkSignal['type'], file: string, evidence: string, ruleHints: string[]): FrameworkSignal {
    return {
      type,
      framework: 'selenium',
      ruleHints,
      evidence,
      location: { file },
    };
  }

  private findLine(content: string, pattern: RegExp): string {
    return content
      .split(/\r?\n/)
      .map(line => line.trim())
      .find(line => pattern.test(line) && !line.startsWith('#')) || '';
  }

  private hasAssertionSignal(content: string): boolean {
    return hasAssertionSignal(content);
  }
}
