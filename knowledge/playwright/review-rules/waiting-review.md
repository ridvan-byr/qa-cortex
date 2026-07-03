# Waiting Review Rules

## Purpose

Detect unnecessary or unstable waiting strategies.

---

## Detect

waitForTimeout()

Manual delays

Redundant waits

Hardcoded waits

---

## Acceptable Waiting

Navigation

Network response

Download

Upload

Application state

---

## Severity

High

Hardcoded waits

Medium

Redundant waits

---

## False Positives

Debugging sessions

Known framework limitation

---

## Recommendation

Prefer Playwright Auto Waiting.

---

## References

Playwright Auto Waiting