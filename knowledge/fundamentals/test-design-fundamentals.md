# Test Design Fundamentals

## Purpose

Test design is the process of deciding WHAT should be tested before deciding HOW it should be automated.

Automation is only the implementation.

Good automation cannot compensate for poor test design.

---

## Core Principle

A test should validate business behaviour rather than implementation details.

---

## What Makes A Good Test?

A good test:

- validates a business requirement
- has a clear purpose
- detects meaningful failures
- is maintainable
- minimizes false positives
- minimizes false negatives

---

## Test Design Before Automation

Always answer these questions before writing Playwright code.

1. What feature is being tested?

2. What business rule is being validated?

3. What user behaviour is expected?

4. What could go wrong?

5. Which scenarios are most critical?

6. What assumptions are being made?

---

## Testing Pyramid Mindset

A QA review should recognize different testing levels.

- Unit Tests
- Integration Tests
- End-to-End Tests

Playwright is primarily an End-to-End testing framework.

Not every scenario belongs in Playwright.

---

## Common Mistake

Writing automation immediately without designing test scenarios first.

This often produces high code coverage but poor test coverage.

---

## QA Brain Rule

Before reviewing Playwright code, always evaluate the quality of the test design.