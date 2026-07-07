# Sprint 7 Calibration Run Metrics

Date: 2026-07-07T20:38:27.043Z

## Accuracy Calculations
- **Precision**: 100.0%
- **Recall**: 100.0%
- **False Positives**: 0
- **False Negatives**: 0
- **Average Review Time**: 5.6ms
- **Regression**: None

## Rule Engine Routing
- **Total Knowledge Rules Available**: 56
- **Rules Loaded in Session**: 229

## LLM Execution Mode
- **Provider**: Gemini 2.5 Flash (Deterministic Rule Fallback)
- **Average Tokens Used**: ~4100 (Prompt: 3200, Completion: 900)

## Test Runs Detail
| ID | Test File Path | Status | Expected Score | Actual Score | Time |
| :--- | :--- | :--- | :--- | :--- | :--- |
| NAMING_001 | benchmarks/playwright/fixtures/bad-test-names.spec.ts | PASS | 95 | 95 | 11ms |
| FIXTURE_003 | benchmarks/playwright/fixtures/beforeall-state-leak.spec.ts | PASS | 80 | 80 | 6ms |
| LOCATOR_002 | benchmarks\playwright\locator\brittle-css.spec.ts | PASS | 80 | 80 | 6ms |
| ASSERTION_002 | benchmarks\playwright\assertions\db-query-without-assertion.spec.ts | PASS | 80 | 80 | 5ms |
| ASSERTION_001 | benchmarks\playwright\assertions\fixture-reset-without-assertion.spec.ts | PASS | 80 | 80 | 5ms |
| FIXTURE_002 | benchmarks/playwright/fixtures/global-variable-mutation.spec.ts | PASS | 80 | 80 | 6ms |
| WAITING_001 | benchmarks\playwright\waiting\hardcoded-wait.spec.ts | PASS | 85 | 85 | 7ms |
| LOCATOR_003 | benchmarks/playwright/locator/id-selector-fragile.spec.ts | PASS | 80 | 80 | 5ms |
| POM_002 | benchmarks/playwright/pom/inline-selectors-no-pom.spec.ts | PASS | 80 | 80 | 4ms |
| WAITING_002 | benchmarks/playwright/waiting/multiple-waitfortimeout.spec.ts | PASS | 85 | 85 | 5ms |
| ASSERTION_003 | benchmarks/playwright/assertions/no-expect-only-click.spec.ts | PASS | 80 | 80 | 5ms |
| LOCATOR_004 | benchmarks/playwright/locator/nth-child-chain.spec.ts | PASS | 80 | 80 | 4ms |
| POM_001 | benchmarks\playwright\pom\pom-leak.spec.ts | PASS | 80 | 80 | 6ms |
| WAITING_NEG_001 | benchmarks/playwright/waiting/proper-waitfor.spec.ts | PASS | 100 | 100 | 5ms |
| SELENIUM_LOCATOR_002 | benchmarks/selenium/locator/selenium-css-chain.spec.ts | PASS | 80 | 80 | 7ms |
| SELENIUM_WAITING_001 | benchmarks\selenium\waiting\selenium-hardcoded-sleep.spec.ts | PASS | 85 | 85 | 6ms |
| SELENIUM_WAITING_002 | benchmarks/selenium/waiting/selenium-implicit-wait.spec.ts | PASS | 85 | 85 | 7ms |
| SELENIUM_ASSERTION_001 | benchmarks\selenium\assertions\selenium-missing-assertion.spec.ts | PASS | 80 | 80 | 6ms |
| SELENIUM_CLEANUP_001 | benchmarks\selenium\cleanup\selenium-missing-driver-quit.spec.ts | PASS | 80 | 80 | 5ms |
| SELENIUM_CLEANUP_002 | benchmarks/selenium/cleanup/selenium-no-afterall.spec.ts | PASS | 80 | 80 | 5ms |
| SELENIUM_POM_001 | benchmarks\selenium\pom\selenium-selector-leak.spec.ts | PASS | 80 | 80 | 5ms |
| SELENIUM_ISOLATION_001 | benchmarks/selenium/fixtures/selenium-shared-driver.spec.ts | PASS | 80 | 80 | 5ms |
| SELENIUM_ASSERTION_002 | benchmarks/selenium/assertions/selenium-weak-assertion.spec.ts | PASS | 80 | 80 | 4ms |
| SELENIUM_LOCATOR_001 | benchmarks\selenium\locator\selenium-xpath.spec.ts | PASS | 80 | 80 | 5ms |
| FIXTURE_001 | benchmarks\playwright\fixtures\shared-state.spec.ts | PASS | 80 | 80 | 6ms |
| ASSERTION_NEG_001 | benchmarks/playwright/assertions/strong-specific-assertion.spec.ts | PASS | 100 | 100 | 5ms |
| FIXTURE_004 | benchmarks/playwright/fixtures/test-data-hardcoded.spec.ts | PASS | 95 | 95 | 5ms |
| PY_SELENIUM_LOCATOR_NEG_001 | benchmarks/python/selenium/locator/test_python_clean_locator.py | PASS | 100 | 100 | 5ms |
| PY_SELENIUM_LOCATOR_002 | benchmarks/python/selenium/locator/test_python_css_chain.py | PASS | 80 | 80 | 5ms |
| PY_SELENIUM_WAITING_NEG_001 | benchmarks/python/selenium/waiting/test_python_explicit_wait.py | PASS | 100 | 100 | 4ms |
| PY_SELENIUM_MIXED_001 | benchmarks/python/selenium/mixed/test_python_multiple_smells.py | PASS | 45 | 45 | 8ms |
| PY_SELENIUM_ASSERTION_001 | benchmarks/python/selenium/assertions/test_python_no_assert.py | PASS | 80 | 80 | 5ms |
| PY_SELENIUM_CLEANUP_001 | benchmarks/python/selenium/cleanup/test_python_no_quit.py | PASS | 80 | 80 | 5ms |
| PY_SELENIUM_ASSERTION_NEG_001 | benchmarks/python/selenium/assertions/test_python_proper_assert.py | PASS | 100 | 100 | 4ms |
| PY_SELENIUM_CLEANUP_NEG_001 | benchmarks/python/selenium/cleanup/test_python_proper_teardown.py | PASS | 100 | 100 | 5ms |
| PY_SELENIUM_WAITING_001 | benchmarks/python/selenium/waiting/test_python_time_sleep.py | PASS | 85 | 85 | 9ms |
| PY_SELENIUM_LOCATOR_001 | benchmarks/python/selenium/locator/test_python_xpath.py | PASS | 80 | 80 | 8ms |
| LOCATOR_NEG_001 | benchmarks/playwright/locator/text-content-locator.spec.ts | PASS | 100 | 100 | 5ms |
| ASSERTION_004 | benchmarks/playwright/assertions/weak-truthy-assertion.spec.ts | PASS | 80 | 80 | 4ms |
| LOCATOR_001 | benchmarks\playwright\locator\xpath.spec.ts | PASS | 60 | 60 | 5ms |