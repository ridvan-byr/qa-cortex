# Selenium Resource Cleanup Review

Selenium tests should clean up WebDriver sessions to avoid leaked browser processes and flaky execution.

## Evidence

- `new Builder().build()` without a matching `driver.quit()`.

## Recommendation Intent

Close the driver in `finally` or test teardown.
