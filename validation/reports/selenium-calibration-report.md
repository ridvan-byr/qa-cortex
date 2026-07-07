# QA Cortex Selenium Calibration & Validation Report

Generated: 2026-07-07T12:17:38.305Z

## Summary

- Repositories configured: 7
- Framework: Selenium WebDriver for Node.js
- Files reviewed: 11
- Findings: 3
- Average review time: 3ms
- LLM provider comparison: Deferred

## Repository Selection

- selenium-javascript-test should be tagged selenium-webdriver or replaced with a clearer Selenium WebDriver candidate.
- selenium-mocha should be tagged selenium-webdriver or replaced with a clearer Selenium WebDriver candidate.
- mocha-selenium-sample should be tagged selenium-webdriver or replaced with a clearer Selenium WebDriver candidate.
- demo-js should be tagged selenium-webdriver or replaced with a clearer Selenium WebDriver candidate.
- python-selenium-framework-example should be tagged selenium-webdriver or replaced with a clearer Selenium WebDriver candidate.
- example-pytest-selenium should be tagged selenium-webdriver or replaced with a clearer Selenium WebDriver candidate.
- selenium-boilerplate should be tagged selenium-webdriver or replaced with a clearer Selenium WebDriver candidate.
- Active Selenium calibration coverage has 4 repositories with Selenium WebDriver for Node.js specs; clone or replace candidates before final Sprint 13D sign-off.
- selenium-javascript-test has 2 active Selenium test files; preferred minimum is 3.
- example-pytest-selenium has 1 active Selenium test files; preferred minimum is 3.

## Repository Results

| Repository | Size | Files | Findings | Critical/High | Avg Time | Notes |
| :--- | :--- | ---: | ---: | ---: | ---: | :--- |
| selenium-javascript-test | small | 2 | 0 | 0 | 4ms | LLM provider comparison skipped. Set runGeminiComparison=true to enable it. |
| selenium-mocha | small | 5 | 2 | 2 | 2ms | LLM provider comparison skipped. Set runGeminiComparison=true to enable it. |
| mocha-selenium-sample | small | 0 | 0 | 0 | 0ms | No Selenium WebDriver for Node.js specs found; excluded from active validation coverage. |
| demo-js | small | 0 | 0 | 0 | 0ms | Local path not found: validation/repos/demo-js/selenium |
| python-selenium-framework-example | small | 3 | 1 | 1 | 3ms | LLM provider comparison skipped. Set runGeminiComparison=true to enable it. |
| example-pytest-selenium | small | 1 | 0 | 0 | 1ms | LLM provider comparison skipped. Set runGeminiComparison=true to enable it. |
| selenium-boilerplate | small | 0 | 0 | 0 | 0ms | No Selenium WebDriver for Node.js specs found; excluded from active validation coverage. |

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
| knowledge/google/maintainability.md | 3 | Medium |
| knowledge/google/test-isolation.md | 3 | Medium |
| knowledge/istqb/boundary-value-analysis.md | 7 | Medium |
| knowledge/owasp/authentication-testing.md | 7 | Medium |
| knowledge/selenium/README.md | 8 | Medium |
| knowledge/selenium/review-rules/locator-review.md | 3 | Medium |
| knowledge/selenium/review-rules/resource-cleanup-review.md | 3 | Medium |

## Calibration Actions

- Rules To Keep: Requires manual triage
- Rules To Modify: Requires manual triage
- Rules To Merge: Requires manual triage
- Rules To Remove: Requires manual triage

## Selenium Calibration Metrics

- Primary goal: improve precision through calibration.
- Precision target: approximately 80%+ as a calibration signal, not a hard gate.
- Recall: qualitative assessment only; large-scale recall measurement is deferred until the benchmark corpus grows.
- Decision format: GO / CONDITIONAL GO / NO-GO.

## Findings Requiring Triage

### F1: Brittle CSS Selector Chain

- Repository: selenium-mocha
- File: test/02.login.basic.hooks.spec.js
- Severity: High
- Evidence: `const checkbox1 = await driver.findElement(By.css("input:nth-child(1)"));`
- Recommendation: Replace brittle CSS chain with getByRole
- Expected: TBD
- Actual: TBD
- Triage: TBD
- Reason: TBD
- Action: keep rule / adjust rule / add benchmark / downgrade severity / document limitation / ignore repo

### F2: Brittle Selenium XPath Locator

- Repository: selenium-mocha
- File: test/02.login.basic.hooks.spec.js
- Severity: High
- Evidence: `const alertButton = await driver.findElement(By.xpath("//button[contains(text(), 'Click for JS Alert')]"));`
- Recommendation: Move locator into a Page Object method and prefer stable, user-facing, or test-owned selectors.
- Expected: TBD
- Actual: TBD
- Triage: TBD
- Reason: TBD
- Action: keep rule / adjust rule / add benchmark / downgrade severity / document limitation / ignore repo

### F3: Hardcoded Sleep

- Repository: python-selenium-framework-example
- File: tests/test_filter_products.py
- Severity: High
- Evidence: `time.sleep(1)`
- Recommendation: Replace sleep with an explicit wait for the expected UI state.
- Expected: TBD
- Actual: TBD
- Triage: TBD
- Reason: TBD
- Action: keep rule / adjust rule / add benchmark / downgrade severity / document limitation / ignore repo

## False Positive / False Negative Learning

Every false positive and false negative must produce one of: new benchmark, rule improvement, or documented justification.

## Go Decision

- Decision: TBD
- GO: Selenium Foundation Validated
- CONDITIONAL GO: Limited support, more calibration needed
- NO-GO: Adapter signal quality insufficient

## Next Actions

- Complete manual triage for every Selenium finding.
- Convert each FP/FN into a benchmark, rule adjustment, severity downgrade, or documented limitation.
- Keep Playwright benchmark behavior semantically unchanged while calibrating Selenium.