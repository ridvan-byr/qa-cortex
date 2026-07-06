---
id: istqb-pairwise-testing
title: Pairwise Testing
category: test-design
priority: high
source: ISTQB Foundation Level
owner: QA Cortex
status: verified
version: 1.0
tags:
  - istqb
  - pairwise
  - combinatorial-testing
related:
  - decision-table-testing
  - equivalence-partitioning
---

# Pairwise Testing

## Purpose

Pairwise Testing is a black-box test design technique used to reduce the number of test cases while maintaining effective coverage.

It is based on the observation that most software defects are caused by interactions between two parameters rather than many parameters simultaneously.

---

## Definition

Instead of testing every possible combination of inputs, Pairwise Testing ensures that every possible pair of input values appears in at least one test case.

---

## Why It Matters

Testing all combinations quickly becomes impossible.

Example:

Browser (5)
Language (10)
Theme (3)
Role (4)

Total combinations:

5 × 10 × 3 × 4 = 600

Pairwise Testing may reduce this to approximately 20–40 tests while preserving high confidence.

---

## When To Use

Use Pairwise Testing when:

- Multiple configuration options exist
- Large parameter combinations
- Cross-browser testing
- Localization
- User roles
- Feature flags

---

## QA Review Perspective

Ask:

- Are all important parameter pairs covered?
- Are unnecessary duplicate combinations tested?
- Are high-risk combinations prioritized?

---

## Playwright Perspective

Example:

Parameters

- Browser
- Language
- User Role

Instead of every combination, ensure every pair appears.

Example:

Chrome + Admin

Chrome + Turkish

Firefox + Guest

Edge + English

...

---

## Common Mistakes

❌ Testing every possible combination.

❌ Ignoring parameter interactions.

❌ Forgetting high-risk pairs.

---

## Review Questions

- Which parameters exist?
- Which parameter pairs are missing?
- Are risky pairs included?

---

## Checklist

□ Parameters identified

□ Pair combinations generated

□ High-risk pairs included

□ Duplicate combinations removed

---

## References

Primary

- ISTQB Foundation Level Syllabus

Related

- Microsoft Testing Playbook---
id: istqb-pairwise-testing
title: Pairwise Testing
category: test-design
priority: high
source: ISTQB Foundation Level
owner: QA Cortex
status: verified
version: 1.0
tags:
  - istqb
  - pairwise
  - combinatorial-testing
related:
  - decision-table-testing
  - equivalence-partitioning
---

# Pairwise Testing

## Purpose

Pairwise Testing is a black-box test design technique used to reduce the number of test cases while maintaining effective coverage.

It is based on the observation that most software defects are caused by interactions between two parameters rather than many parameters simultaneously.

---

## Definition

Instead of testing every possible combination of inputs, Pairwise Testing ensures that every possible pair of input values appears in at least one test case.

---

## Why It Matters

Testing all combinations quickly becomes impossible.

Example:

Browser (5)
Language (10)
Theme (3)
Role (4)

Total combinations:

5 × 10 × 3 × 4 = 600

Pairwise Testing may reduce this to approximately 20–40 tests while preserving high confidence.

---

## When To Use

Use Pairwise Testing when:

- Multiple configuration options exist
- Large parameter combinations
- Cross-browser testing
- Localization
- User roles
- Feature flags

---

## QA Review Perspective

Ask:

- Are all important parameter pairs covered?
- Are unnecessary duplicate combinations tested?
- Are high-risk combinations prioritized?

---

## Playwright Perspective

Example:

Parameters

- Browser
- Language
- User Role

Instead of every combination, ensure every pair appears.

Example:

Chrome + Admin

Chrome + Turkish

Firefox + Guest

Edge + English

...

---

## Common Mistakes

❌ Testing every possible combination.

❌ Ignoring parameter interactions.

❌ Forgetting high-risk pairs.

---

## Review Questions

- Which parameters exist?
- Which parameter pairs are missing?
- Are risky pairs included?

---

## Checklist

□ Parameters identified

□ Pair combinations generated

□ High-risk pairs included

□ Duplicate combinations removed

---

## References

Primary

- ISTQB Foundation Level Syllabus

Related

- Microsoft Testing Playbook