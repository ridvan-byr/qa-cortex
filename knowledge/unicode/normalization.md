---
id: unicode-normalization
title: Unicode Normalization Testing
category: internationalization
priority: critical
source: Unicode Standard
owner: QA Brain
status: verified
version: 1.0
tags:
  - unicode
  - normalization
  - nfc
  - nfd
related:
  - unicode-testing
---

# Unicode Normalization Testing

## Purpose

Unicode Normalization Testing verifies that visually identical text is processed consistently regardless of its underlying Unicode representation.

---

## Why It Matters

Many Unicode characters can be represented in multiple valid ways.

These strings may look identical but differ internally.

Without normalization, applications may fail during:

- Login
- Search
- Duplicate detection
- Validation
- Comparison

---

## Common Normalization Forms

### NFC

Precomposed characters.

Preferred for storage in most applications.

---

### NFD

Characters represented as base character plus combining marks.

Example

```
é
```

can be stored as

```
e + ◌́
```

Both look identical.

---

## Typical Risks

Search

```
José
```

cannot be found.

---

Duplicate Detection

```
José
```

and

```
José
```

are treated as different users.

---

Authentication

Password comparison fails.

---

Database

Duplicate records created.

---

API

Different services normalize differently.

---

## QA Review Perspective

Ask

- Is text normalized before comparison?

- Can duplicate values bypass validation?

- Is search normalization-aware?

- Is login affected?

---

## Playwright Perspective

Whenever login, registration or search features exist, recommend normalization scenarios.

---

## Suggested Test Areas

- Registration

- Login

- Search

- Profile Update

- Import

- Export

---

## Common Mistakes

❌ Assuming identical appearance means identical text.

❌ Never testing normalization.

❌ Ignoring combining characters.

---

## Checklist

□ Registration

□ Login

□ Search

□ Duplicate Detection

□ Update

□ Import

□ Export

---

## QA Brain Guidance

Whenever QA Brain reviews text-processing features, it should recommend normalization scenarios in addition to standard Unicode testing.

---

## References

Primary

- Unicode Standard

Related

- W3C Character Model