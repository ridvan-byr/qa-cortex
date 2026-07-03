import type { ReviewContext } from '../types/ReviewContext';

export class KnowledgeRouter {
  /**
   * Scans target file for patterns, emits signals, and routes to corresponding knowledge files.
   */
  public routeKnowledge(context: ReviewContext): string[] {
    const files: string[] = [];
    const content = context.targetFile.content;

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
    if (content.match(/let\s+[a-zA-Z0-9_]+\s*=\s*['"]/) || content.includes('browser.newContext(')) {
      signals.add('Isolation');
    }

    // 4. Signal: Assertion (Check if assertions are missing or weak)
    if (!content.includes('expect(')) {
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
}
