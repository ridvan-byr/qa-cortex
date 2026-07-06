---
id: w3c-localization
title: Localization (l10n)
category: internationalization
priority: high
source: W3C Internationalization
owner: QA Cortex
status: verified
version: 1.0
tags:
  - w3c
  - localization
  - l10n
related:
  - internationalization
  - locale-testing
---

# Localization (l10n)

## Purpose

Localization (l10n) adapts an internationalized application to a specific language, region or culture.

Testing verifies that the localized version behaves correctly and naturally for its target users.

---

## Why It Matters

Translation alone is not sufficient.

Localization also affects:

- Dates
- Time
- Currency
- Address formats
- Phone numbers
- Sorting
- Images
- Legal text

---

## What Should Be Tested

### Translation

- Labels
- Buttons
- Messages
- Notifications

---

### Formatting

Verify regional conventions.

Examples

Dates

```
03/07/2026
```

may represent different dates depending on locale.

---

### Currency

```
₺

$

€

£
```

---

### Addresses

Different countries use different address structures.

---

### Phone Numbers

Different lengths and prefixes.

---

### Sorting

Verify locale-aware alphabetical ordering.

---

### Images & Icons

Ensure visuals are culturally appropriate.

---

## QA Review Perspective

Ask:

- Is the application translated correctly?
- Are formats locale-specific?
- Are regional rules respected?
- Are validation rules locale-aware?

---

## Playwright Perspective

Execute the same workflow under multiple locales and compare behavior rather than only translated text.

---

## Common Mistakes

❌ Assuming English formatting.

❌ Ignoring address differences.

❌ Locale-independent validation.

❌ Only testing translations.

---

## Checklist

□ Translation

□ Date

□ Time

□ Currency

□ Address

□ Phone

□ Sorting

□ Validation

---

## QA Cortex Guidance

Whenever locale support exists, QA Cortex should recommend validating both translated content and locale-specific business behavior.

---

## References

Primary

- W3C Internationalization

Related

- Unicode Standard