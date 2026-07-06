---
id: google-test-smells
title: Test Smells
category: automation
priority: high
source: Google Testing Blog
owner: QA Cortex
status: verified
version: 1.0
tags:
  - google
  - test-smells
related:
  - maintainability
  - flaky-tests
---

# Test Smells

## Purpose

Test Smells are patterns that make automated tests difficult to maintain, unreliable or misleading.

Detecting test smells improves long-term automation quality.

---

## Common Test Smells

### Sleep-Based Synchronization

```
waitForTimeout()
```

---

### Duplicate Tests

Multiple tests verifying identical behavior.

---

### Large Test Cases

One test covering too many scenarios.

---

### Weak Assertions

Checking only that a page loads.

---

### Hardcoded Test Data

Fixed usernames, emails or IDs.

---

### Hidden Dependencies

Tests relying on execution order.

---

### Fragile Selectors

Deep CSS selectors

Dynamic IDs

XPath chains

---

## QA Review Perspective

Ask

- Is the test doing too much?

- Is synchronization reliable?

- Are assertions meaningful?

- Is data reusable?

---

## Playwright Perspective

Prefer

- getByRole()

- getByLabel()

- getByTestId()

Avoid

- Deep CSS

- XPath when unnecessary

---

## Common Mistakes

❌ Large scenarios

❌ Weak assertions

❌ Duplicate coverage

❌ Timing dependencies

---

## Checklist

□ Small scope

□ Strong assertions

□ Stable selectors

□ No sleeps

□ Independent execution

---

## QA Cortex Guidance

QA Cortex should identify test smells and recommend concrete refactoring actions instead of only reporting issues.

---

## References

Primary

- Google Testing Blog

Related

- Playwright Best Practices