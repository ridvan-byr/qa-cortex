---
id: google-test-isolation
title: Test Isolation
category: automation
priority: critical
source: Google Testing Blog
owner: QA Cortex
status: verified
version: 1.0
tags:
  - google
  - isolation
  - automation
related:
  - test-data-management
---

# Test Isolation

## Purpose

Test Isolation ensures that every automated test can execute independently without relying on the outcome of other tests.

---

## Why It Matters

Independent tests are:

- Reliable
- Repeatable
- Parallelizable
- Easier to debug

Poor isolation is one of the primary causes of flaky automation.

---

## What Should Be Tested

### Independent Execution

Each test should pass regardless of execution order.

---

### Data Independence

Tests should create their own data when possible.

---

### Cleanup

Remove created data after execution.

---

### Parallel Execution

Tests should safely run simultaneously.

---

### Environment Independence

Tests should not rely on previous executions.

---

## QA Review Perspective

Ask

- Can this test run alone?

- Can this test run in parallel?

- Does it depend on another test?

- Is cleanup performed?

---

## Playwright Perspective

Good

```
Create Data

↓

Execute Test

↓

Cleanup
```

Bad

```
Test B requires Test A
```

---

## Common Mistakes

❌ Shared test users.

❌ Shared database records.

❌ Tests depending on execution order.

❌ Missing cleanup.

---

## Checklist

□ Independent execution

□ Independent data

□ Cleanup

□ Parallel safe

□ Repeatable

---

## QA Cortex Guidance

QA Cortex should warn whenever tests depend on previous execution or shared mutable state.

---

## References

Primary

- Google Testing Blog

Related

- Microsoft Test Data Management