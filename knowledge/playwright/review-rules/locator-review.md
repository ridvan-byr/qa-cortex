# Locator Review Rules

## Purpose

Evaluate whether Playwright locators follow official best practices.

---

## Detection Rules

Detect:

- XPath locators
- Deep CSS selectors
- nth-child selectors
- Dynamic class selectors
- Overly generic selectors

---

## Preferred Order

1. getByRole()
2. getByLabel()
3. getByPlaceholder()
4. getByText()
5. getByTestId()
6. CSS Locator
7. XPath

---

## Severity

Critical

None

High

Dynamic selectors causing flaky tests

Medium

XPath usage

Deep CSS selectors

Low

Minor selector improvements

---

## Confidence Rules

95%

Official Playwright recommendation violated.

80%

Likely improvement available.

60%

Possible improvement.

---

## False Positives

- Legacy applications
- SVG elements
- Third-party widgets
- No accessible attributes available

---

## False Negatives

- Generated selectors
- Runtime-generated DOM

---

## Recommendation

Suggest the highest-priority locator that can replace the current one.

---

## References

Playwright Actionability

Playwright Best Practices# Locator Review Rules

## Purpose

Evaluate whether Playwright locators follow official best practices.

---

## Detection Rules

Detect:

- XPath locators
- Deep CSS selectors
- nth-child selectors
- Dynamic class selectors
- Overly generic selectors

---

## Preferred Order

1. getByRole()
2. getByLabel()
3. getByPlaceholder()
4. getByText()
5. getByTestId()
6. CSS Locator
7. XPath

---

## Severity

Critical

None

High

Dynamic selectors causing flaky tests

Medium

XPath usage

Deep CSS selectors

Low

Minor selector improvements

---

## Confidence Rules

95%

Official Playwright recommendation violated.

80%

Likely improvement available.

60%

Possible improvement.

---

## False Positives

- Legacy applications
- SVG elements
- Third-party widgets
- No accessible attributes available

---

## False Negatives

- Generated selectors
- Runtime-generated DOM

---

## Recommendation

Suggest the highest-priority locator that can replace the current one.

---

## References

Playwright Actionability

Playwright Best Practices