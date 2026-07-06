---
id: microsoft-negative-testing
title: Negative Testing
category: validation
priority: critical
source: Microsoft Testing Playbook
owner: QA Cortex
status: verified
version: 1.0
tags:
  - microsoft
  - negative-testing
related:
  - boundary-value-analysis
  - edge-case-testing
  - input-validation
---

# Negative Testing

## Purpose

Negative Testing verifies that an application correctly handles invalid, unexpected, or malicious input without crashing or producing incorrect results.

The goal is to ensure robustness rather than confirming expected behavior.

---

## Definition

Instead of verifying what users should do, Negative Testing verifies what users should NOT be able to do.

---

## Why It Matters

Real users make mistakes.

Applications must:

- Reject invalid data
- Display meaningful error messages
- Preserve data integrity
- Remain stable

---

## Typical Negative Scenarios

Input Fields

- Empty value
- Null
- Whitespace only
- Too short
- Too long
- Invalid characters
- Emoji
- SQL keywords
- HTML tags

Authentication

- Wrong password
- Locked account
- Expired session
- Disabled account

Files

- Unsupported format
- Empty file
- Oversized file
- Corrupted file

---

## QA Review Perspective

Ask:

- What invalid inputs exist?
- Are invalid actions rejected?
- Are proper error messages displayed?
- Can users bypass validation?

---

## Playwright Perspective

Instead of only testing:

```
Valid username
Valid password
Login succeeds
```

Also automate:

- Empty username
- Empty password
- Wrong password
- Invalid email
- SQL payload
- XSS payload
- Unicode input
- Very long input

---

## Common Mistakes

❌ Writing only happy-path tests.

❌ Ignoring invalid user behavior.

❌ Forgetting validation messages.

❌ Not verifying application stability.

---

## Review Questions

- Which invalid inputs are missing?
- Can validation be bypassed?
- Are all errors handled consistently?
- Are invalid workflows automated?

---

## Checklist

□ Empty input

□ Null input

□ Invalid format

□ Invalid length

□ Invalid characters

□ Unicode

□ SQL Injection payload

□ XSS payload

□ Proper error message

□ Application remains stable

---

## QA Cortex Guidance

Whenever QA Cortex detects an input field, it should automatically ask:

"Where are the negative tests?"

Missing negative scenarios should significantly reduce the overall coverage score.

---

## References

Primary

- Microsoft Testing Playbook

Related

- ISTQB Foundation Level
- OWASP Web Security Testing Guide