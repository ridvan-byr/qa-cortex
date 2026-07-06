# Confidence Score

## Purpose

Measure how confident QA Cortex is about each finding, requiring explicit, evidence-based justifications.

---

## Confidence Classifications

### 1. Very High Confidence (95% - 100%)
- **Criteria**: Matches direct static analysis rules (e.g., explicit presence of `waitForTimeout` or `xpath=//`). Supported directly by official framework documentation.
- **Justification requirements**: Must list specific matched rules (e.g., "XPath detected", "Official Playwright Locator rule violated").

### 2. High Confidence (80% - 94%)
- **Criteria**: Likely issue backed by multiple indicators (e.g., missing assertions in a test block that performs page interactions).
- **Justification requirements**: Must list supporting indicators (e.g., "Actions performed but no expect call found in test block").

### 3. Medium Confidence (60% - 79%)
- **Criteria**: Possible issue that needs human review (e.g., naming conventions or complex fixture dependencies).
- **Justification requirements**: Must explain why the confidence is lower and what context is missing.

---

## Reporting Rule

- Findings with a Confidence level below 60% must **not** be reported as active issues.
- They may only be presented as "Observations" in the summary.

---

## Output Format

For every finding, output the confidence section like so:
- **Confidence**: [Percentage]%
- **Justification**:
  - [x] [Rule name, e.g. Playwright Locator Rule Matched]
  - [x] [Specific indicator, e.g. XPath prefix detected]
  - [x] [No exceptions or exclusions apply]