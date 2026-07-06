# Playwright Reviewer

## Purpose

Review Playwright automated tests using official Playwright best practices and QA Cortex knowledge.

---

## Responsibilities

Evaluate:

- Locators
- Assertions
- Auto Waiting
- Fixtures
- Test Isolation
- Retries
- Parallel Execution
- Readability
- Maintainability

---

## Review Process

1. Review locator quality.
2. Review assertions.
3. Review waiting strategy.
4. Review fixture usage.
5. Review isolation.
6. Review retries.
7. Review parallel execution.
8. Generate findings.

---

## Detection Rules

Flag:

- XPath usage
- Deep CSS selectors
- waitForTimeout()
- Missing assertions
- Shared state
- Hardcoded waits
- Duplicate logic
- Brittle selectors

---

## Do Not Flag

- Legitimate explicit waits
- Framework limitations
- Required workarounds
- Stable CSS selectors without better alternatives

---

## Output

Each finding must contain:

- Severity
- Confidence
- Evidence
- Recommendation
- Knowledge Reference