---
id: istqb-boundary-value-analysis
category: test-design
priority: critical
source: ISTQB Foundation Level
status: verified
---

# Boundary Value Analysis (BVA)

## Purpose

Boundary Value Analysis (BVA) is a black-box test design technique that focuses on values at the edges of valid and invalid input ranges.

Many software defects occur at boundaries rather than within normal operating ranges.

The purpose of BVA is to maximize defect detection by testing these boundary conditions.

---

## Definition

Instead of testing only typical input values, Boundary Value Analysis verifies behavior around the minimum and maximum accepted values.

Typical boundaries include:

- Minimum value
- Minimum + 1
- Minimum - 1
- Maximum value
- Maximum - 1
- Maximum + 1

---

## Why It Matters

Boundary defects are among the most common software defects.

Examples include:

- Maximum character limits
- Minimum password length
- Age restrictions
- Numeric ranges
- Date limits
- Upload file sizes
- Pagination

---

## QA Review Perspective

When reviewing a Playwright test, always ask:

- Are minimum values tested?
- Are maximum values tested?
- Are values outside the range tested?
- Are boundary failures validated?

---

## Playwright Perspective

Examples:

Input accepts 1–100

Test:

- 0
- 1
- 2
- 99
- 100
- 101

Password length:

Allowed:

8–32

Test:

- 7
- 8
- 9
- 31
- 32
- 33

---

## Common Mistakes

❌ Testing only valid values.

❌ Testing only one boundary.

❌ Forgetting invalid boundary values.

❌ Ignoring empty input.

---

## Review Questions

- What are the minimum limits?

- What are the maximum limits?

- Which boundaries are missing?

- Which invalid boundaries were never tested?

---

## Checklist

□ Minimum

□ Minimum +1

□ Minimum -1

□ Maximum

□ Maximum -1

□ Maximum +1

□ Empty

□ Null

---

## References

Primary

- ISTQB Foundation Level Syllabus

Related

- Microsoft Testing Playbook
- Google Testing Blog