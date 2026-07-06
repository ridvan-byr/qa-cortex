---
id: w3c-character-encoding
title: Character Encoding Testing
category: internationalization
priority: critical
source: W3C Character Model
owner: QA Cortex
status: verified
version: 1.0
tags:
  - w3c
  - encoding
  - utf8
related:
  - utf8
  - unicode-testing
---

# Character Encoding Testing

## Purpose

Character Encoding Testing verifies that text is encoded, transmitted and interpreted consistently throughout the application.

---

## Why It Matters

Encoding mismatches may lead to:

- Garbled text
- Failed searches
- Incorrect validation
- Broken exports
- API communication issues

---

## What Should Be Tested

### Browser

- Page encoding
- Form submission
- Rendering

---

### API

- Request encoding
- Response encoding
- Headers

---

### Database

- Storage
- Retrieval
- Updates

---

### Files

CSV

Excel

JSON

XML

PDF

---

## Typical Defects

```
Ç

↓

Ã‡
```

---

```
Ö

↓

Ã–
```

---

```
Ş

↓

Åž
```

---

## QA Review Perspective

Ask

- Is UTF-8 consistently used?

- Are headers correct?

- Are imported files encoded correctly?

- Can exported files be opened correctly?

---

## Playwright Perspective

Verify encoding after:

- Create

- Update

- Search

- Export

- Import

- API requests

---

## Common Mistakes

❌ Assuming browser encoding is sufficient.

❌ Ignoring exported files.

❌ Never validating API headers.

❌ Database encoding mismatch.

---

## Checklist

□ Browser

□ API

□ Database

□ Import

□ Export

□ Search

□ Validation

□ UI

---

## QA Cortex Guidance

Whenever text crosses system boundaries, QA Cortex should recommend character encoding verification.

---

## References

Primary

- W3C Character Model

Related

- Unicode Standard