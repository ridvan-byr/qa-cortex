---
id: owasp-xss-test-data
title: Cross-Site Scripting (XSS) Test Data
category: security-validation
priority: high
source: OWASP Web Security Testing Guide
owner: QA Cortex
status: verified
version: 1.0
tags:
  - owasp
  - xss
  - validation
related:
  - input-validation
---

# Cross-Site Scripting (XSS) Test Data

## Purpose

Cross-Site Scripting (XSS) Test Data verifies that user-controlled input cannot inject executable scripts into the application.

QA automation should ensure that user input is safely handled and rendered as plain text whenever appropriate.

---

## Scope

This document focuses on validation testing and secure rendering of user input.

It is not intended for penetration testing.

---

## Recommended Test Data

Basic HTML

```html
<b>Bold</b>
```

Simple Script

```html
<script>alert('XSS')</script>
```

Image Event

```html
<img src=x onerror=alert(1)>
```

SVG

```html
<svg onload=alert(1)>
```

Broken HTML

```html
<<script>>
```

Mixed Input

```
John<script>alert(1)</script>
```

Unicode + HTML

```
Çınar<script>alert(1)</script>
```

---

## Expected Behaviour

Application should:

- Treat input as text
- Encode dangerous characters
- Never execute scripts
- Preserve application stability
- Display safe validation messages

---

## QA Review Perspective

Ask

- Is user input escaped?

- Can HTML be injected?

- Can JavaScript execute?

- Are rich text fields intentionally allowing HTML?

---

## Playwright Perspective

Common areas

- Comments

- Profile name

- Search

- Feedback

- Chat

- Notes

---

## Common Mistakes

❌ Never testing HTML input.

❌ Ignoring rich text fields.

❌ Assuming frontend validation is sufficient.

❌ Rendering raw user input.

---

## Checklist

□ HTML Tags

□ Script Tags

□ Event Attributes

□ Mixed Input

□ Error Handling

□ Safe Rendering

□ No Script Execution

---

## QA Cortex Guidance

Whenever QA Cortex detects a text field whose content is displayed later in the UI, recommend XSS validation scenarios.

---

## References

Primary

- OWASP Web Security Testing Guide

Related

- Input Validation Testing