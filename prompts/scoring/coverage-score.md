# Coverage Score

## Purpose

Measure how comprehensively the automated test validates application behavior, splitting the metrics between the single file and the entire feature domain.

---

## Split Coverage Metrics

### 1. File Coverage (0-100)
- Measures coverage exclusively within the analyzed spec file.
- Evaluate standard QA dimensions: Happy Path, Negative Testing, Boundary Value Analysis, Edge Cases, and Unicode.

### 2. Feature Coverage (0-100)
- Measures the aggregate coverage of the entire business feature domain across the repository.
- Search for companion files (e.g., if analyzing `login.spec.ts`, check if `login-negative.spec.ts` or `login-validation.ts` exists).
- If companion files exist, aggregate their test cases to calculate the overall Feature Coverage.
- If run in isolation without access to other repository files, output `"Requires Repository Analysis"`.

---

## Scoring Deductions

Start from 100 and subtract points for missing elements:
- Missing Happy Path: -40
- Missing Negative Testing: -20 (only deduct from File Coverage if no companion negative specs exist)
- Missing Boundary Value Analysis: -15
- Missing Unicode/Locale Validation (when fields accept input): -10
- Missing Security/Sanitization checks (for inputs/uploads): -15

---

## Never Penalize

- Business requirements intentionally excluded by specifications.
- Framework/browser-specific technical limitations.

---

## Output

- **File Coverage Score**: [Value]
- **Feature Coverage Score**: [Value / "Requires Repository Analysis"]
- **Gaps Checklist**: Detail missing items for both file and repository levels.