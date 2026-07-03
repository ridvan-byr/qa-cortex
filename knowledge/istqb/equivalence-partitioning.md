---
id: istqb-equivalence-partitioning
category: test-design
priority: critical
source: ISTQB Foundation Level
status: verified
---

# Equivalence Partitioning

## Purpose

Equivalence Partitioning (EP) is a black-box test design technique that divides input data into groups (partitions) that are expected to behave the same.

Instead of testing every possible value, one representative value from each partition is selected.

The goal is to reduce the number of test cases while maintaining effective coverage.

---

## Definition

Inputs are divided into:

- Valid partitions
- Invalid partitions

Each partition should produce similar behavior.

---

## Why It Matters

Testing every possible input is impossible.

Equivalence Partitioning reduces the number of tests while preserving confidence in the software.

---

## Example

Age must be between 18 and 60.

Partitions:

Valid:
- 18–60

Invalid:
- Less than 18
- Greater than 60

Representative tests:

- 25 ✅
- 15 ❌
- 70 ❌

---

## QA Review Perspective

Ask:

- Have all valid partitions been tested?

- Have all invalid partitions been tested?

- Is there unnecessary duplication?

---

## Playwright Perspective

Instead of testing:

18

19

20

21

22

23

24

...

Test only:

25

15

70

Then use Boundary Value Analysis separately for limits.

---

## Common Mistakes

❌ Confusing Equivalence Partitioning with Boundary Value Analysis.

❌ Testing many values from the same partition.

❌ Ignoring invalid partitions.

---

## Review Questions

- What are the valid partitions?

- What are the invalid partitions?

- Which partition is missing?

---

## References

Primary

- ISTQB Foundation Level Syllabus