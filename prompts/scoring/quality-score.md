# Quality Score

## Purpose

Measure code quality and maintainability using explicit dimensional weights and checkbox reasons.

---

## Evaluation Dimensions

| Dimension | Weight | Target Criteria |
| :--- | :--- | :--- |
| **Readability** | 15% | Standard code naming conventions, minimal magic numbers, code comments where necessary. |
| **Maintainability** | 15% | Page Object Model (POM) usage, DRY code (no duplicated login/navigation setups). |
| **Assertions** | 20% | User-visible outcome assertions, no weak/missing assertions. |
| **Test Isolation** | 15% | Independent tests, no shared mutable state. |
| **Stability** | 15% | Reliance on Auto Waiting, absence of `waitForTimeout` or arbitrary sleep calls. |
| **Data Quality** | 10% | Avoidance of hardcoded passwords/sensitive values, isolated sandbox data. |
| **Best Practices** | 10% | Correct imports, correct page fixtures, use of standard test runner utilities. |

---

## Scoring Logic

Start from 100 and deduct according to the dimensions violated. For example, if `waitForTimeout` is used (violating Stability), deduct 15 points. If brittle XPath is used (violating Maintainability), deduct 15 points.

---

## Output Format

Output the Quality and Maintainability scores along with a checklist of justifications:
- **Quality Score**: [0-100]
  - [ ] [✓/✗] Page Object Model (POM) encapsulation
  - [ ] [✓/✗] Resilient role locator hierarchy
  - [ ] [✓/✗] State/context isolation
  - [ ] [✓/✗] Robust auto-waiting strategy
  - [ ] [✓/✗] Strong outcome-based assertions