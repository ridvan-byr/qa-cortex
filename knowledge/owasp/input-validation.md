---
id: owasp-input-validation
title: Input Validation Testing
category: security-validation
priority: critical
source: OWASP Web Security Testing Guide
owner: QA Cortex
status: verified
version: 1.0
tags:
  - owasp
  - validation
  - input
related:
  - negative-testing
  - boundary-value-analysis
  - unicode-testing
---

# Input Validation Testing

## Purpose

Input Validation Testing verifies that applications correctly accept valid input while rejecting invalid, unexpected or malicious data.

The goal is to ensure data integrity, application stability and security.

---

## Why It Matters

Every user-controlled input is a potential source of defects or vulnerabilities.

Poor validation may lead to:

- Invalid business data
- Application crashes
- Security vulnerabilities
- Database corruption
- Unexpected application behavior

---

## What Should Be Tested

### Required Fields

- Empty values
- Null values
- Whitespace only

---

### Length

- Minimum length
- Maximum length
- Above maximum
- Below minimum

---

### Format

Examples

- Email
- Phone
- URL
- Date
- Postal Code

---

### Characters

- Letters
- Numbers
- Special Characters
- Unicode
- Emoji

---

### Invalid Input

Examples

```
<script>

'

"

<>

--

NULL
```

---

## QA Review Perspective

Ask

- Is client-side validation present?

- Is server-side validation present?

- Can validation be bypassed?

- Are error messages meaningful?

---

## Playwright Perspective

Every input field should have:

- Happy Path
- Boundary Tests
- Negative Tests
- Unicode Tests
- Security Payload Tests

---

## Common Mistakes

❌ Validating only in the UI.

❌ Missing server validation.

❌ Accepting unexpected characters.

❌ Inconsistent validation rules.

---

## Checklist

□ Required

□ Length

□ Format

□ Unicode

□ Special Characters

□ Security Payload

□ Error Messages

□ Server Validation

---

## QA Cortex Guidance

Whenever an editable input exists, QA Cortex should recommend a complete validation matrix before approving test coverage.

---

## References

Primary

- OWASP Web Security Testing Guide

Related

- ISTQB Foundation Level
- Microsoft Testing Playbook