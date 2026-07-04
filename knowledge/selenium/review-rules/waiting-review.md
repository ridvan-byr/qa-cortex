# Selenium Waiting Review

Avoid hardcoded sleeps because they create slow and flaky tests.

## Evidence

- `driver.sleep(...)`

## Recommendation Intent

Replace sleeps with explicit waits for observable browser state.
