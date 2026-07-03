---
id: owasp-authentication-testing
title: Authentication Testing
category: security-validation
priority: critical
source: OWASP Web Security Testing Guide
owner: QA Brain
status: verified
version: 1.0
tags:
  - owasp
  - authentication
related:
  - risk-based-testing
  - negative-testing
---

# Authentication Testing

## Purpose

Authentication Testing verifies that only legitimate users can successfully authenticate and that authentication failures are handled securely.

---

## Why It Matters

Authentication is one of the highest-risk areas of any application.

Failures may lead to:

- Unauthorized access
- Account compromise
- Information disclosure
- Session abuse

---

## What Should Be Tested

### Login

- Valid credentials
- Invalid password
- Invalid username
- Empty fields
- Locked account
- Disabled account
- Expired password

---

### Password

- Minimum length
- Maximum length
- Complexity rules
- Password masking

---

### Account Lockout

Verify repeated failed logins.

---

### Error Messages

Ensure errors do not reveal:

- Whether username exists
- Internal system details

---

### MFA (if applicable)

- Valid code
- Invalid code
- Expired code
- Reused code

---

## QA Review Perspective

Ask

- Are all login outcomes tested?

- Can invalid users gain access?

- Are error messages safe?

- Is MFA validated?

---

## Playwright Perspective

Automate

- Successful login

- Failed login

- Locked account

- Expired session

- Logout

- Remember Me

- MFA flow (if available)

---

## Common Mistakes

❌ Testing only successful login.

❌ Ignoring lockout.

❌ Never testing logout.

❌ Missing session expiration.

---

## Checklist

□ Valid Login

□ Invalid Login

□ Empty Fields

□ Locked Account

□ Logout

□ Session Expiration

□ MFA

□ Safe Error Messages

---

## QA Brain Guidance

Authentication workflows should always receive the highest review priority.

Every authentication feature should include Happy Path, Negative Testing, Boundary Testing and Session Validation.

---

## References

Primary

- OWASP Web Security Testing Guide

Related

- ISTQB Risk-Based Testing
- Microsoft Negative Testing