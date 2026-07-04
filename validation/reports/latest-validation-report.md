# QA Brain Validation Report

Generated: 2026-07-04T11:02:29.836Z

## Summary

- Repositories configured: 10
- Files reviewed: 226
- Findings: 2
- Average review time: 1ms
- Gemini comparison: Skipped

## Repository Selection

- Active validation coverage has 9 repositories with Playwright specs; replace no-spec repositories before final Sprint 11 sign-off.
- Active validation coverage has 1 small repositories with Playwright specs; minimum target is 2.

## Repository Results

| Repository | Size | Files | Findings | Critical/High | Avg Time | Notes |
| :--- | :--- | ---: | ---: | ---: | ---: | :--- |
| ixartz/Next-js-Boilerplate | small | 0 | 0 | 0 | 0ms | No Playwright specs found; excluded from active validation coverage. |
| imbhargav5/nextbase-nextjs-supabase-starter | small | 4 | 0 | 0 | 2ms | Gemini comparison skipped. Set runGeminiComparison=true to enable it. |
| MarcusFelling/demo.playwright | medium | 19 | 0 | 0 | 2ms | Gemini comparison skipped. Set runGeminiComparison=true to enable it. |
| vitalets/playwright-bdd | medium | 16 | 0 | 0 | 1ms | Gemini comparison skipped. Set runGeminiComparison=true to enable it. |
| synpress-io/synpress | large | 50 | 1 | 0 | 1ms | Gemini comparison skipped. Set runGeminiComparison=true to enable it. |
| allure-framework/allure-js | large | 50 | 0 | 0 | 1ms | Gemini comparison skipped. Set runGeminiComparison=true to enable it. |
| serenity-js/serenity-js | enterprise | 50 | 0 | 0 | 1ms | Gemini comparison skipped. Set runGeminiComparison=true to enable it. |
| microsoft/playwright-vscode | medium | 21 | 0 | 0 | 2ms | Gemini comparison skipped. Set runGeminiComparison=true to enable it. |
| antiwork/shortest | medium | 4 | 0 | 0 | 2ms | Gemini comparison skipped. Set runGeminiComparison=true to enable it. |
| akshayp7/playwright-typescript-playwright-test | medium | 12 | 1 | 0 | 1ms | Gemini comparison skipped. Set runGeminiComparison=true to enable it. |

## Accuracy Matrix

| Category | Precision | Recall |
| :--- | :--- | :--- |
| Locator | Requires manual triage | Requires manual triage |
| Waiting | Requires manual triage | Requires manual triage |
| POM | Requires manual triage | Requires manual triage |
| Repository | Requires manual triage | Requires manual triage |
| Assertions | Requires manual triage | Requires manual triage |
| Fixtures | Requires manual triage | Requires manual triage |
| Isolation | Requires manual triage | Requires manual triage |

## Rule Coverage
 
| Rule | Trigger Count | Confidence |
| :--- | ---: | :--- |
| knowledge/google/maintainability.md | 82 | High |
| knowledge/google/test-isolation.md | 1 | Low |
| knowledge/istqb/boundary-value-analysis.md | 14 | High |
| knowledge/owasp/authentication-testing.md | 14 | High |
| knowledge/owasp/input-validation.md | 17 | High |
| knowledge/playwright/fundamentals/assertions.md | 1 | Low |
| knowledge/playwright/fundamentals/locators.md | 82 | High |
| knowledge/playwright/README.md | 136 | High |
| knowledge/playwright/review-rules/assertion-review.md | 1 | Low |
| knowledge/playwright/review-rules/isolation-review.md | 1 | Low |
| knowledge/playwright/review-rules/locator-review.md | 82 | High |
| knowledge/playwright/review-rules/parallel-review.md | 1 | Low |
| knowledge/unicode/unicode-testing.md | 17 | High |

## Calibration Actions

- Rules To Keep: Requires manual triage
- Rules To Modify: Requires manual triage
- Rules To Merge: Requires manual triage
- Rules To Remove: Requires manual triage

## Findings Requiring Triage

### F1: Missing Assertion

- Repository: synpress-io/synpress
- File: wallets/metamask/test/playwright/e2e/resetAccount.spec.ts
- Severity: Medium
- Evidence: `test('reset the account', async ({ context, metamaskPage }) => {`
- Recommendation: Add an assertion for the expected UI state, navigation, response, or persisted data after the action.
- Triage: TBD
- Action: New benchmark / Rule improvement / Documented justification

### F2: Missing Assertion

- Repository: akshayp7/playwright-typescript-playwright-test
- File: tests/db/DB.test.ts
- Severity: Medium
- Evidence: `test('Connect to Postgres DB', async () => {`
- Recommendation: Add an assertion for the expected UI state, navigation, response, or persisted data after the action.
- Triage: TBD
- Action: New benchmark / Rule improvement / Documented justification

## False Positive / False Negative Learning

Every false positive and false negative must produce one of: new benchmark, rule improvement, or documented justification.