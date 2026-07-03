# Risk Score

## Purpose

Calculate the overall risk score based on both the business criticality of the feature under test and the severity of the findings detected.

---

## Risk Calculation Mappings

Overall Risk is calculated as:
`Overall Risk Score = Feature Risk Score * Max Issue Severity Score`

### 1. Feature Risk Score (Business Criticality)
- **Critical (4)**: Authentication, Payments, Checkout, Session Handling, Data Integrity.
- **High (3)**: Registration, Profile Settings, File Upload.
- **Medium (2)**: Search, Filtering, CRUD list operations.
- **Low (1)**: Static UI preferences, Theme selections.

### 2. Issue Severity Score (Detected Findings)
- **Critical (4)**: Missing assertions, hardcoded credentials, broken isolation (shared states).
- **High (3)**: Hardcoded waits (`waitForTimeout`), missing negative tests.
- **Medium (2)**: XPath/brittle CSS selectors, excessive retries.
- **Low (1)**: Naming convention issues, minor readability gaps.

---

## Overall Risk Classification

- **Critical**: Score between 12 and 16.
- **High**: Score between 8 and 11.
- **Medium**: Score between 4 and 7.
- **Low**: Score between 1 and 3.

---

## Output

- **Risk Score**: [Product of Feature Risk * Max Issue Severity, e.g. 4 * 3 = 12]
- **Risk Level**: [Critical / High / Medium / Low]
- **Calculation Details**: Explain the Feature Risk, Max Issue Severity, and the resulting product.