# QA Cortex Manual Triage Report

Generated: 2026-07-04

## Scope

This report classifies the remaining Rule Only validation findings after Sprint 11 calibration.
Gemini comparison was skipped because Gemini quota is currently unavailable. ChatGPT was used as a manual expert reviewer, not as an automated validation provider.

Latest validation baseline before this triage:

| Metric | Value |
| :--- | :--- |
| Repositories configured | 10 |
| Active repositories with Playwright specs | 9 |
| Files reviewed | 226 |
| Rule Only findings | 5 |
| Gemini comparison | Skipped |
| Manual triage | Completed |

Latest validation baseline after applying triage actions:

| Metric | Value |
| :--- | :--- |
| Repositories configured | 10 |
| Active repositories with Playwright specs | 10 |
| Files reviewed | 229 |
| Active findings | 2 |
| Benchmark tests | 7 |
| Benchmark regression | None |

## Summary

This report does not prove final QA Cortex accuracy. It classifies the final uncertainty left after calibration.

Validation progression:

| Stage | Findings |
| :--- | ---: |
| Initial real repository validation | 59 |
| First calibration | 26 |
| Second calibration | 5 |
| Clear false positives after manual triage | 0 |
| Active findings after triage actions | 2 |

The important result is that the remaining findings are no longer a basic detection problem. They are a classification problem: QA Cortex is seeing a real missing-assertion signal, but it still needs better context and action calibration.

## Remaining Findings Classification

| Classification | Count |
| :--- | ---: |
| True Positive | 2 |
| Observation Candidate | 2 |
| Rule Improvement Candidate | 1 |
| Clear False Positive | 0 |

Do not present `2 / 5` as overall QA Cortex precision. It only describes the strict classification of the final 5 findings, not total validation precision across 226 reviewed files.

## Finding Decisions

| Finding | Repository | Rule Only | Manual Triage | Recommended Action |
| :--- | :--- | :--- | :--- | :--- |
| F1 | MarcusFelling/demo.playwright | Missing Assertion | Observation Candidate | Downgrade demo/example missing assertion to Observation |
| F2 | MarcusFelling/demo.playwright | Missing Assertion | Observation Candidate | Downgrade demo/example missing assertion to Observation |
| F3 | MarcusFelling/demo.playwright | Missing Assertion | Rule Improvement Candidate | Add per-test assertion detection backlog |
| F4 | synpress-io/synpress | Missing Assertion | True Positive | Added benchmark candidate |
| F5 | akshayp7/playwright-typescript-playwright-test | Missing Assertion | True Positive | Added benchmark candidate |

## Detailed Triage

### F1 - Android WebView Example

- Repository: MarcusFelling/demo.playwright
- File: `android/tests/example.spec.ts`
- Rule Only finding: Missing Assertion
- Manual verdict: Observation Candidate
- Evidence reviewed: The test connects to Android, opens WebView, navigates, logs the page title, and closes the device.
- Assertion status: No assertion found.
- Recommended assertion: Assert title, URL, loaded page state, or a visible WebView condition.
- Action: Demo/example repository context should downgrade this to Observation.
- Implementation: Downgraded by demo/example path-aware filtering.

### F2 - Chrome Extension Background Page

- Repository: MarcusFelling/demo.playwright
- File: `chrome-extension/tests/example.spec.ts`
- Rule Only finding: Missing Assertion
- Manual verdict: Observation Candidate
- Evidence reviewed: The test reads `browserContext.backgroundPages()[0]` but does not assert that it exists or has the expected URL/state.
- Assertion status: No assertion found.
- Recommended assertion: Assert background page is defined and validate expected extension state.
- Action: Demo/example repository context should downgrade this to Observation.
- Implementation: Downgraded by demo/example path-aware filtering.

### F3 - Performance API Example

- Repository: MarcusFelling/demo.playwright
- File: `performance/tests/example.spec.ts`
- Rule Only finding: Missing Assertion
- Manual verdict: Rule Improvement Candidate
- Evidence reviewed: The first test measures `loadEventEnd` and writes an annotation without enforcing a threshold. A later Lighthouse test in the same file has a `performance: 90` threshold.
- Assertion status: First test has no assertion; file has at least one threshold-based validation later.
- Recommended assertion: Assert a max load duration or convert metric-only collection into an Observation.
- Action: Add per-test assertion analysis so QA Cortex reasons about each `test(...)` block instead of only the file.
- Implementation: Added to backlog; not implemented yet.

### F4 - Synpress MetaMask Reset Account

- Repository: synpress-io/synpress
- File: `wallets/metamask/test/playwright/e2e/resetAccount.spec.ts`
- Rule Only finding: Missing Assertion
- Manual verdict: True Positive
- Evidence reviewed: The test opens settings, resets account, and returns home, but does not verify reset state.
- Assertion status: No assertion found.
- Recommended assertion: Verify account state, activity/history reset, expected balance, or expected home page state after reset.
- Action: Benchmark added for fixture-heavy reset flows without final state assertion.
- Implementation: Added `ASSERTION_001`.

### F5 - DB Connection Test

- Repository: akshayp7/playwright-typescript-playwright-test
- File: `tests/db/DB.test.ts`
- Rule Only finding: Missing Assertion
- Manual verdict: True Positive
- Evidence reviewed: The test connects to Postgres and runs a query without checking query result, connection state, or expected data.
- Assertion status: No assertion found.
- Recommended assertion: Assert connection success and query result shape/count/content.
- Action: Benchmark added for database/API-adjacent tests without result assertion.
- Implementation: Added `ASSERTION_002`.

## Recommended Sprint 11 Interpretation

- QA Cortex correctly detects missing assertion signals in the remaining files.
- There are 0 clear false positives in the final manual triage set.
- After applying observation calibration, only the 2 true-positive findings remain active.
- The no-spec small repository was replaced with `microsoft/playwright-mcp`, so final validation coverage satisfies repository selection criteria.
- The next improvement is not basic assertion detection; it is severity/action calibration by repository context and per-test granularity.

## Backlog Items

- Demo/example/tutorial repository context should produce Observation for missing assertions unless the repository is marked as production validation.
- Missing Assertion should become test-block aware instead of file-level.
- Fixture-heavy reset flows without final state assertion should remain a benchmarked True Positive.
- DB/API-adjacent tests without result assertion should remain a benchmarked True Positive.
- Run provider comparison after Gemini/OpenAI API usage is available.
