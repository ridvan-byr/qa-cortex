---
id: owasp-sql-injection-test-data
title: SQL Injection Test Data
category: security-validation
priority: high
source: OWASP Web Security Testing Guide
owner: QA Brain
status: verified
version: 1.0
tags:
  - owasp
  - sql-injection
related:
  - input-validation
---

# SQL Injection Test Data

## Purpose

SQL Injection Test Data helps verify that user input is safely handled and cannot alter SQL queries.

QA automation should verify that applications reject malicious input without crashing or exposing sensitive information.

---

## Scope

This knowledge focuses on **validation testing**, not penetration testing.

The objective is to ensure that applications correctly validate and safely process unexpected SQL-like input.

---

## Recommended Test Data

Single Quote

```
'
```

Double Quote

```
"
```

SQL Comment

```
--
```

Basic Payload

```
' OR '1'='1
```

Boolean Expression

```
1 OR 1=1
```

Always False

```
' AND '1'='2
```

Semicolon

```
;
```

Keyword Only

```
SELECT

INSERT

DELETE

UPDATE
```

Mixed Input

```
John'123
```

---

## Expected Behaviour

The application should:

- Reject invalid input when appropriate
- Escape or parameterize values
- Display safe error messages
- Never expose SQL errors
- Continue functioning normally

---

## QA Review Perspective

Ask

- Is input validated?

- Are SQL keywords handled safely?

- Does the application remain stable?

- Are internal database errors hidden?

---

## Playwright Perspective

Example scenarios

- Login form

- Search box

- Username

- Comment field

- Registration

- Filter input

---

## Common Mistakes

❌ No SQL payload testing.

❌ Verifying only successful input.

❌ Ignoring search fields.

❌ Displaying raw database errors.

---

## Checklist

□ Quote

□ Double Quote

□ SQL Comment

□ Boolean Expression

□ SQL Keywords

□ Mixed Input

□ Error Message

□ Stable Application

---

## QA Brain Guidance

Whenever QA Brain detects a text input, search box or authentication form, it should recommend SQL validation scenarios as part of the review.

---

## References

Primary

- OWASP Web Security Testing Guide

Related

- Input Validation Testing