import type { FrameworkName } from './types';

export type RoutingSignal = 'Locator' | 'Timeout' | 'Isolation' | 'Assertion' | 'Cleanup';

export interface RoutingRuleMapping {
  signal: RoutingSignal;
  rule: string;
  generic: boolean;
  adapterEvidence: string[];
  knowledgeFiles: string[];
}

export const PLAYWRIGHT_BASE_KNOWLEDGE_FILES = ['knowledge/playwright/README.md'];
export const SELENIUM_BASE_KNOWLEDGE_FILES = ['knowledge/selenium/README.md'];

export const PLAYWRIGHT_ROUTING_RULES: RoutingRuleMapping[] = [
  {
    signal: 'Locator',
    rule: 'Brittle Locator',
    generic: false,
    adapterEvidence: ['Playwright LocatorSignal'],
    knowledgeFiles: [
      'knowledge/playwright/review-rules/locator-review.md',
      'knowledge/playwright/fundamentals/locators.md',
      'knowledge/google/maintainability.md',
    ],
  },
  {
    signal: 'Timeout',
    rule: 'Auto Waiting',
    generic: false,
    adapterEvidence: ['Playwright WaitSignal'],
    knowledgeFiles: [
      'knowledge/playwright/review-rules/waiting-review.md',
      'knowledge/playwright/fundamentals/auto-waiting.md',
      'knowledge/google/flaky-tests.md',
    ],
  },
  {
    signal: 'Isolation',
    rule: 'Test Isolation',
    generic: true,
    adapterEvidence: ['LifecycleSignal'],
    knowledgeFiles: [
      'knowledge/playwright/review-rules/isolation-review.md',
      'knowledge/playwright/review-rules/parallel-review.md',
      'knowledge/google/test-isolation.md',
    ],
  },
  {
    signal: 'Assertion',
    rule: 'Missing Assertion',
    generic: true,
    adapterEvidence: ['AssertionSignal'],
    knowledgeFiles: [
      'knowledge/playwright/review-rules/assertion-review.md',
      'knowledge/playwright/fundamentals/assertions.md',
    ],
  },
];

export const SELENIUM_ROUTING_RULES: RoutingRuleMapping[] = [
  {
    signal: 'Locator',
    rule: 'Brittle Locator',
    generic: false,
    adapterEvidence: ['Selenium LocatorSignal'],
    knowledgeFiles: [
      'knowledge/selenium/review-rules/locator-review.md',
      'knowledge/google/maintainability.md',
    ],
  },
  {
    signal: 'Timeout',
    rule: 'Hardcoded Sleep',
    generic: false,
    adapterEvidence: ['Selenium WaitSignal'],
    knowledgeFiles: [
      'knowledge/selenium/review-rules/waiting-review.md',
      'knowledge/google/flaky-tests.md',
    ],
  },
  {
    signal: 'Cleanup',
    rule: 'Resource Cleanup',
    generic: true,
    adapterEvidence: ['LifecycleSignal'],
    knowledgeFiles: [
      'knowledge/selenium/review-rules/resource-cleanup-review.md',
      'knowledge/google/test-isolation.md',
    ],
  },
  {
    signal: 'Assertion',
    rule: 'Missing Assertion',
    generic: true,
    adapterEvidence: ['AssertionSignal'],
    knowledgeFiles: [
      'knowledge/selenium/review-rules/assertion-review.md',
    ],
  },
];

export function getBaseKnowledgeFiles(framework: FrameworkName): string[] {
  if (framework === 'playwright') {
    return PLAYWRIGHT_BASE_KNOWLEDGE_FILES;
  }
  if (framework === 'selenium') {
    return SELENIUM_BASE_KNOWLEDGE_FILES;
  }

  return [];
}

export function getKnowledgeFilesForSignals(framework: FrameworkName, signals: Set<string>): string[] {
  if (framework === 'playwright') {
    return PLAYWRIGHT_ROUTING_RULES
      .filter(mapping => signals.has(mapping.signal))
      .flatMap(mapping => mapping.knowledgeFiles);
  }

  if (framework === 'selenium') {
    return SELENIUM_ROUTING_RULES
      .filter(mapping => signals.has(mapping.signal))
      .flatMap(mapping => mapping.knowledgeFiles);
  }

  return [];
}
