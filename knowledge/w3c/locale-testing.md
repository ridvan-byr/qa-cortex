---
id: w3c-locale-testing
title: Locale Testing
category: internationalization
priority: critical
source: W3C Internationalization
owner: QA Brain
status: verified
version: 1.0
tags:
  - w3c
  - locale
  - internationalization
related:
  - internationalization
  - localization
---

# Locale Testing

## Purpose

Locale Testing verifies that an application behaves correctly for different regional settings, including language, date, time, currency, number formatting, sorting and cultural conventions.

---

## Why It Matters

Applications often work correctly in one locale but fail in another due to incorrect assumptions about regional formats.

Locale defects may affect:

- Date parsing
- Number formatting
- Currency display
- Validation
- Search
- Sorting
- Reports

---

## What Should Be Tested

### Dates

Examples

US

```
07/03/2026
```

Turkey

```
03.07.2026
```

ISO

```
2026-07-03
```

---

### Numbers

English

```
1,234.56
```

German

```
1.234,56
```

---

### Currency

Examples

```
₺

$

€

£

¥
```

---

### Time

12-hour

```
03:30 PM
```

24-hour

```
15:30
```

---

### Sorting

Verify locale-aware alphabetical order.

Example

Turkish sorting differs from English.

---

### Validation

Phone numbers

Postal codes

Tax IDs

National IDs

---

## QA Review Perspective

Ask

- Which locales are officially supported?

- Are locale-specific validations implemented?

- Are formats displayed correctly?

- Is sorting locale-aware?

---

## Playwright Perspective

Run critical workflows using multiple locale configurations.

Verify:

- Formatting
- Validation
- Search
- Sorting
- Reports

---

## Common Mistakes

❌ Hardcoded locale.

❌ Assuming US formatting.

❌ Ignoring regional validation.

❌ Never testing sorting.

---

## Checklist

□ Dates

□ Numbers

□ Currency

□ Time

□ Sorting

□ Validation

□ Reports

□ Search

---

## QA Brain Guidance

Whenever locale support exists, QA Brain should recommend running regression tests using every officially supported locale.

---

## References

Primary

- W3C Internationalization