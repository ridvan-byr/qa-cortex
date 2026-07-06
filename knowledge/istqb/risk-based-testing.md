---
id: istqb-risk-based-testing
title: Risk-Based Testing
category: test-strategy
priority: critical
source: ISTQB Foundation Level
owner: QA Cortex
status: verified
version: 1.0
tags:
  - istqb
  - risk
  - strategy
related:
  - exploratory-testing
  - negative-testing
---

# Risk-Based Testing

## Purpose

Risk-Based Testing prioritizes testing efforts according to business risk.

Not every feature requires the same testing depth.

Critical functionality should receive more comprehensive testing.

---

## Definition

Risk is typically evaluated using:

Risk = Likelihood × Impact

Higher risk means higher testing priority.

---

## Why It Matters

Testing time is always limited.

Risk-Based Testing helps QA teams focus on features where failures would have the greatest business impact.

---

## Risk Categories

High Risk

- Authentication
- Payments
- User Registration
- Data Deletion
- Permissions

Medium Risk

- Search
- Filtering
- Profile Update

Low Risk

- UI Theme
- Help Pages
- Static Content

---

## QA Review Perspective

Ask:

- How critical is this feature?
- What happens if it fails?
- Is testing proportional to the business risk?
- Are high-risk scenarios covered first?

---

## Playwright Perspective

Authentication

Should include:

- Happy Path
- Negative Path
- Locked User
- Expired Session
- Invalid Credentials
- Authorization Checks

Static Help Page

One smoke test may be sufficient.

---

## Common Mistakes

❌ Giving equal importance to every feature.

❌ Spending excessive effort on low-risk functionality.

❌ Ignoring business impact.

---

## Review Questions

- What is the business impact?
- What is the likelihood of failure?
- What scenarios are critical?
- Which scenarios are optional?

---

## Checklist

□ Risk identified

□ Risk level assigned

□ High-risk scenarios prioritized

□ Business impact documented

□ Critical paths covered

---

## QA Cortex Guidance

QA Cortex should increase review strictness as business risk increases.

High-risk features require:

- More negative tests
- More boundary tests
- More security validation
- More localization coverage

---

## References

Primary

- ISTQB Foundation Level Syllabus

Related

- Google Testing Blog
- Microsoft Testing Playbook