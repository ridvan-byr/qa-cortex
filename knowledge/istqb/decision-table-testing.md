---
id: istqb-decision-table-testing
title: Decision Table Testing
category: test-design
priority: high
source: ISTQB Foundation Level
owner: QA Cortex
status: verified
version: 1.0
tags:
  - istqb
  - decision-table
  - business-rules
related:
  - state-transition-testing
  - risk-based-testing
---

# Decision Table Testing

## Purpose

Decision Table Testing is a black-box test design technique used when the system behavior depends on combinations of conditions.

It ensures that all important combinations of business rules are covered.

---

## Definition

A decision table represents:

- Conditions (inputs)
- Actions (outputs)

Each column represents one business rule.

---

## Why It Matters

Many software defects occur because developers correctly implement individual rules but fail when multiple rules interact.

Decision Table Testing systematically validates these combinations.

---

## When To Use

Use Decision Table Testing when:

- Multiple conditions affect an outcome
- Business rules are complex
- Validation depends on combinations
- Pricing calculations
- Permission systems
- Login flows
- Discount rules

---

## Example

Conditions

| Premium User | Subscription Active | Expected Result |
|--------------|---------------------|-----------------|
| Yes | Yes | Allow Access |
| Yes | No | Deny Access |
| No | Yes | Deny Premium Features |
| No | No | Deny Access |

Each row should become a separate automated test.

---

## QA Review Perspective

Ask:

- Are all business rule combinations covered?
- Are impossible combinations excluded?
- Are failure scenarios tested?
- Are default behaviors validated?

---

## Playwright Perspective

Instead of writing one login test:

Write one test for every business rule.

Example:

- Premium + Active
- Premium + Expired
- Standard + Active
- Standard + Expired

---

## Common Mistakes

❌ Testing only the happy path

❌ Ignoring invalid combinations

❌ Combining multiple business rules into one test

❌ Missing default behavior

---

## Review Questions

- What business rules exist?
- Which combinations are missing?
- Which combinations have never been automated?
- Is each rule independently validated?

---

## Checklist

□ Every rule identified

□ Every valid combination tested

□ Invalid combinations considered

□ Default behavior verified

□ Error messages validated

---

## References

Primary

- ISTQB Foundation Level Syllabus

Related

- Microsoft Testing Playbook