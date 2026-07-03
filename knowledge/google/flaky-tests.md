---
id: google-flaky-tests
title: Flaky Tests
category: automation
priority: critical
source: Google Testing Blog
owner: QA Brain
status: verified
version: 1.0
tags:
  - google
  - flaky-tests
  - automation
related:
  - test-isolation
  - maintainability
---

# Flaky Tests

## Purpose

Flaky Tests are automated tests that pass or fail inconsistently without any application changes.

The goal is to identify, prevent and eliminate unstable tests.

---

## Why It Matters

Flaky tests reduce confidence in automation.

Teams eventually ignore failures, causing real defects to be missed.

---

## Common Causes

### Timing

- Fixed waits
- Slow loading
- Animation

---

### Test Data

- Shared users
- Shared records
- Dirty environment

---

### Dependencies

- Execution order
- Previous test state

---

### External Systems

- APIs
- Third-party services
- Network latency

---

### Selectors

- Dynamic IDs
- Unstable locators

---

## QA Review Perspective

Ask

- Can this test fail randomly?

- Does it depend on timing?

- Does it use fixed waits?

- Is test data isolated?

---

## Playwright Perspective

Prefer

```ts
expect(locator).toBeVisible();

await page.waitForURL(...);
```

Avoid

```ts
waitForTimeout(5000);
```

---

## Common Mistakes

❌ Fixed sleeps

❌ Shared data

❌ Dynamic selectors

❌ Order dependency

---

## Checklist

□ Auto waiting

□ Stable locators

□ Independent data

□ Parallel safe

□ No fixed waits

---

## QA Brain Guidance

QA Brain should flag tests that rely on timing, execution order or unstable selectors.

---

## References

Primary

- Google Testing Blog