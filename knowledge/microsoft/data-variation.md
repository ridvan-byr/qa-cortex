---
id: microsoft-failure-path
title: Failure Path Testing
category: workflow
priority: critical
source: Microsoft Testing Playbook
owner: QA Brain
status: verified
version: 1.0
tags:
  - microsoft
  - failure-path
related:
  - happy-path
  - negative-testing
---

# Failure Path Testing

## Purpose

Failure Path Testing verifies that the application behaves correctly when operations fail.

Users should receive clear feedback, and the application should remain stable.

---

## Definition

Failure paths represent business workflows where an operation cannot be completed.

---

## Examples

Login

- Wrong password
- Locked account
- Expired session

Payment

- Card declined
- Payment timeout

Upload

- Invalid file
- File too large

API

- 500 Internal Server Error
- Timeout
- Network disconnected

---

## QA Review Perspective

Ask:

- What happens if the operation fails?

- Is the error understandable?

- Can the user recover?

---

## Playwright Perspective

Examples

- Mock API 500 response

- Simulate timeout

- Disable network

- Force validation failure

- Retry operation

---

## Common Mistakes

❌ Testing only successful workflows.

❌ Ignoring recovery.

❌ Missing error assertions.

---

## Review Questions

- Is every major failure scenario covered?

- Is recovery tested?

- Are meaningful messages displayed?

---

## Checklist

□ Error message

□ Retry available

□ State preserved

□ Application stable

□ Recovery verified

□ Logging considered

---

## QA Brain Guidance

High-risk workflows should always include both Happy Path and Failure Path automation.

---

## References

Primary

- Microsoft Testing Playbook

Related

- ISTQB Foundation Level