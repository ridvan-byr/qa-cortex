# Assertion Review Rules

## Purpose

Ensure every meaningful action is validated.

---

## Detect

Missing assertions

Weak assertions

Implementation assertions

Multiple unrelated assertions

Assertions after timeout

---

## Severity

Critical

No assertion after user action

High

Weak validation

Medium

Redundant assertions

---

## False Positives

Helper methods performing assertions internally.

---

## Recommendation

Prefer user-visible outcome assertions.

---

## References

Playwright Assertions

ISTQB Test Oracle