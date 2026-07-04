import * as assert from 'assert';
import { DiffDetector, type ChangedFile } from '../../src/github/DiffDetector';
import { PRCommentFormatter, type PRReviewSummary } from '../../src/reporter/PRCommentFormatter';

function testDiffDetector() {
  console.log('Testing DiffDetector...');

  // Mock token is fine for instantiation and pattern testing
  const detector = new DiffDetector('mock-token');

  const files: ChangedFile[] = [
    { filename: 'src/cli.ts', status: 'modified' },
    { filename: 'tests/login.spec.ts', status: 'modified' },
    { filename: 'tests/logout.test.ts', status: 'added' },
    { filename: 'tests/old.spec.ts', status: 'removed' },
    { filename: 'generated/test.spec.ts', status: 'added' },
    { filename: 'fixtures/fixture.ts', status: 'modified' },
  ];

  // 1. Basic filtering (only spec.ts/test.ts and ignore removed)
  const filtered1 = detector.filterTestFiles(files);
  assert.deepStrictEqual(filtered1, [
    'tests/login.spec.ts',
    'tests/logout.test.ts',
    'generated/test.spec.ts'
  ]);

  // 2. Ignore patterns
  const filtered2 = detector.filterTestFiles(files, ['**/generated/**', '**/fixtures/**']);
  assert.deepStrictEqual(filtered2, [
    'tests/login.spec.ts',
    'tests/logout.test.ts'
  ]);

  console.log('✓ DiffDetector tests passed.');
}

function testPRCommentFormatter() {
  console.log('Testing PRCommentFormatter...');

  const summary: PRReviewSummary = {
    filesReviewed: 2,
    criticalFindings: 1,
    executionMode: '🤖 Gemini 2.5 Flash + Rules',
    results: [
      {
        file: 'tests/login.spec.ts',
        qualityScore: 90,
        verdict: 'Good',
        findingsCount: 1,
        criticalCount: 0,
        findings: []
      },
      {
        file: 'tests/checkout.spec.ts',
        qualityScore: 40,
        verdict: 'Poor',
        findingsCount: 2,
        criticalCount: 1,
        findings: [
          {
            title: 'Hardcoded timeout',
            description: 'waitForTimeout should not be used',
            severity: 'Critical',
            confidence: { level: 100, justification: [] },
            evidence: 'await page.waitForTimeout(5000);',
            recommendation: 'Use auto-waiting assertions.'
          }
        ]
      }
    ]
  };

  const comment = PRCommentFormatter.formatComment(summary);

  assert.ok(comment.includes('<!-- qa-brain-review -->'));
  assert.ok(comment.includes('## 🧠 QA Brain Review'));
  assert.ok(comment.includes('🤖 Gemini 2.5 Flash + Rules'));
  assert.ok(comment.includes('| `tests/checkout.spec.ts` | 40/100 | ❌ Poor | 1 Critical, 1 Other |'));
  assert.ok(comment.includes('Hardcoded timeout'));
  assert.ok(comment.includes('await page.waitForTimeout(5000);'));

  const stepSummary = PRCommentFormatter.formatStepSummary(summary);
  assert.ok(stepSummary.includes('Average Score | 65/100'));

  console.log('✓ PRCommentFormatter tests passed.');
}

function testScanner() {
  console.log('Testing Scanner...');
  const { Scanner } = require('../../src/core/Scanner');

  // We can scan the benchmarks folder as a test
  const allFiles = Scanner.scanDirectory('benchmarks/playwright');
  assert.ok(allFiles.length > 0);

  // Check deterministic sorting
  const sortedFiles = [...allFiles].sort();
  assert.deepStrictEqual(allFiles, sortedFiles);

  // Check ignore patterns
  const filteredFiles = Scanner.scanDirectory('benchmarks/playwright', ['**/locator/**']);
  // locator folder files should be excluded
  const hasLocator = filteredFiles.some((f: string) => f.includes('locator'));
  assert.strictEqual(hasLocator, false);

  console.log('✓ Scanner tests passed.');
}

function runAll() {
  try {
    testDiffDetector();
    testPRCommentFormatter();
    testScanner();
    console.log('\nAll integration tests passed successfully!');
  } catch (error) {
    console.error('Test verification failed:', error);
    process.exit(1);
  }
}

runAll();
