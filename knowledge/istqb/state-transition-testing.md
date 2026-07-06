---
id: istqb-state-transition-testing
title: State Transition Testing
category: test-design
priority: high
source: ISTQB Foundation Level
owner: QA Cortex
status: verified
version: 1.0
tags:
  - istqb
  - state-transition
related:
  - decision-table-testing
---

# State Transition Testing

## Purpose

State Transition Testing verifies that a system behaves correctly as it moves between different states.

It is especially useful for workflows where previous actions affect future behavior.

---

## Definition

A state is the current condition of the system.

A transition is the event that changes one state into another.

Testing ensures that both valid and invalid transitions behave correctly.

---

## Why It Matters

Many production defects occur because applications correctly implement valid transitions but fail to reject invalid ones.

---

## Common Examples

- Login / Logout
- Account Lock
- Order Status
- Payment Flow
- Password Reset
- User Activation
- Approval Processes

---

## Example

Order Workflow

Pending

↓

Paid

↓

Packed

↓

Shipped

↓

Delivered

Invalid examples

Delivered → Pending

Cancelled → Shipped

Shipped → Paid

These should never be allowed.

---

## QA Review Perspective

Ask:

- Which states exist?
- Which transitions are allowed?
- Which transitions are forbidden?
- Are invalid transitions tested?

---

## Playwright Perspective

Do not only verify the normal flow.

Also verify that impossible transitions are rejected.

Example:

Valid

Pending → Paid

Paid → Packed

Packed → Shipped

Invalid

Delivered → Paid

Cancelled → Delivered

Pending → Delivered

---

## Common Mistakes

❌ Testing only valid transitions

❌ Forgetting invalid transitions

❌ Ignoring previous system state

❌ Assuming state always starts clean

---

## Review Questions

- Have all states been identified?
- Are all valid transitions covered?
- Are invalid transitions tested?
- Does the application recover correctly after failure?

---

## Checklist

□ Initial state verified

□ Every valid transition tested

□ Every invalid transition rejected

□ Final state verified

□ Recovery scenarios tested

---

## References

Primary

- ISTQB Foundation Level Syllabus

Related

- Microsoft Testing Playbook