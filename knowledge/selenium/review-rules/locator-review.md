# Selenium Locator Review

Prefer maintainable, intent-revealing locators over brittle XPath or deeply coupled selectors.

## Evidence

- `driver.findElement(By.xpath(...))`
- Inline selectors inside specs while Page Objects exist

## Recommendation Intent

Move selectors into Page Object methods and prefer stable, user-facing, or test-owned selectors where possible.
