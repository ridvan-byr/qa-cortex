---
id: microsoft-test-data-management
title: Test Data Management
category: test-data
priority: critical
source: Microsoft Testing Playbook
owner: QA Brain
status: verified
version: 1.0
tags:
  - microsoft
  - test-data
  - data-management
related:
  - data-variation
---

# Test Data Management

## Purpose

Test Data Management ensures that automated tests use reliable, repeatable, isolated, and maintainable test data.

Poor test data is one of the leading causes of flaky automation.

---

## Definition

Test data should be:

- Predictable
- Repeatable
- Independent
- Easy to reset
- Easy to maintain

---

## Good Practices

Use:

- Seed data
- Factory methods
- Faker libraries
- Randomized but controlled values
- Cleanup after execution

Avoid:

- Hardcoded production accounts
- Shared mutable data
- Manual test data creation

---

## Typical Strategies

### Static Data

Known users

```
admin@test.com
```

Good for smoke tests.

---

### Generated Data

```
faker.person.firstName()
faker.internet.email()
```

Good for registration flows.

---

### Seed Data

Create data before the test.

Remove it after execution.

---

### API Preparation

Create test data through APIs before UI automation starts.

---

## QA Review Perspective

Ask:

- Is the test independent?
- Can it run repeatedly?
- Does it leave unwanted data?
- Is cleanup performed?

---

## Playwright Perspective

Good:

```
Create User

↓

Run Test

↓

Delete User
```

Bad:

```
Use Existing User Forever
```

---

## Common Mistakes

❌ Shared accounts.

❌ Reusing dirty data.

❌ Manual database preparation.

❌ Tests depending on previous tests.

---

## Review Questions

- Can this test run in parallel?
- Can it run repeatedly?
- Is test data isolated?
- Is cleanup automatic?

---

## Checklist

□ Independent data

□ Repeatable

□ Cleanup performed

□ Parallel-safe

□ No shared state

□ Uses generated data where appropriate

---

## QA Brain Guidance

QA Brain should warn whenever:

- Shared accounts are reused.
- Tests depend on execution order.
- Data cleanup is missing.
- Parallel execution may cause conflicts.

---

## References

Primary

- Microsoft Testing Playbook

Related

- Playwright Best Practices