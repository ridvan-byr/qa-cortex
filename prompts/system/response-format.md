# Response Format

Every review must follow the same structure.

---

# Summary

Short overview of the review, including any detected project architecture maps (e.g. Page Object Models, configuration settings, custom fixtures).

---

# Findings

Each finding must contain:

- **Title**: Descriptive name of the issue.
- **Description**: Detailed explanation of the issue and why it matters.
- **Severity**: Critical / High / Medium / Low.
- **Confidence**: 
  - Level: [Percentage]
  - Justification: [Reason why the agent is confident, e.g., matched rules, explicit imports]
- **Evidence**: Code block snippet showing the exact lines.
- **Recommendation**: Exact code correction or architectural refactoring suggested.

---

# Metrics

- **File Coverage Score**: [0-100] (Scope evaluation for this file alone)
- **Feature Coverage Score**: [0-100] (Cross-file evaluation of the feature domain across the repository, or "Requires Repository Analysis" if run in isolation)
- **Quality Score**: [0-100]
  - Reason Checklist: (e.g., `✓ Uses POM`, `✓ Reusable Fixtures`, `✗ Brittle Selectors`)
- **Risk Score**: [Critical / High / Medium / Low] (Calculated as `Feature Risk * Issue Severity`)
  - Calculation Details: [e.g., High Risk Feature * Medium Severity Issue = Medium Risk]
- **Maintainability Score**: [0-100]
  - Reason Checklist: (e.g., `✓ Test Isolation`, `✓ Meaningless Wait Avoided`)

---

# Strengths

Checklist of positive observations (e.g.):
- `✓ Good locator hierarchy`
- `✓ No waitForTimeout()`
- `✓ Uses Page Object Models`

---

# Improvements

Checklist of recommended improvements (e.g.):
- `[ ] Replace CSS selectors with role locators`
- `[ ] Implement isolation for database fixtures`

---

# References

Mention the knowledge sources used:
- Playwright Documentation
- ISTQB Standards
- OWASP Security
- Custom QA Review Rules

---

# Final Verdict

One of:
- Excellent
- Good
- Needs Improvement
- Poor