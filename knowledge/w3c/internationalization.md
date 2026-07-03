---
id: unicode-rtl-testing
title: Right-to-Left (RTL) Testing
category: internationalization
priority: high
source: W3C Internationalization
owner: QA Brain
status: verified
version: 1.0
tags:
  - rtl
  - unicode
  - localization
related:
  - localization
  - unicode-testing
---

# Right-to-Left (RTL) Testing

## Purpose

RTL Testing verifies that applications correctly support languages written from right to left.

Examples include Arabic, Hebrew and Persian.

---

## Why It Matters

Applications designed only for left-to-right languages often suffer from layout and usability issues when RTL languages are introduced.

---

## Languages

Arabic

```
العربية
```

Hebrew

```
עברית
```

Persian

```
فارسی
```

---

## What Should Be Tested

### Layout

- Alignment
- Navigation
- Menus
- Icons
- Buttons

---

### Text

- Input fields
- Labels
- Placeholders
- Error messages

---

### Forms

- Validation messages
- Cursor position
- Text selection

---

### Tables

- Alignment
- Column order

---

### Navigation

- Breadcrumbs
- Pagination
- Sidebars

---

## QA Review Perspective

Ask:

- Does the layout mirror correctly?
- Are icons positioned correctly?
- Is text readable?
- Are forms usable?

---

## Playwright Perspective

When RTL is supported:

Verify:

- Layout direction
- Text alignment
- Input behavior
- Error message placement
- Navigation order

---

## Common Mistakes

❌ Only translating text.

❌ Forgetting layout direction.

❌ Icons pointing the wrong way.

❌ Broken responsive layouts.

---

## Recommended Test Data

```
محمد

العربية

مرحبا

שלום

فارسی
```

---

## Checklist

□ Layout

□ Navigation

□ Forms

□ Validation

□ Search

□ Tables

□ Mobile

□ Responsive

---

## QA Brain Guidance

Whenever RTL locales are supported, QA Brain should recommend a dedicated RTL regression suite.

---

## References

Primary

- W3C Internationalization

Related

- Unicode Standard