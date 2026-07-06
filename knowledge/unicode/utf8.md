---
id: unicode-utf8
title: UTF-8 Testing
category: internationalization
priority: critical
source: Unicode Standard
owner: QA Cortex
status: verified
version: 1.0
tags:
  - unicode
  - utf8
  - encoding
related:
  - unicode-testing
  - character-encoding
---

# UTF-8 Testing

## Purpose

UTF-8 Testing verifies that applications consistently encode, transmit, store and display text using UTF-8 without data corruption.

---

## Why It Matters

UTF-8 is the most widely used character encoding on the web.

Encoding mismatches may cause:

- Corrupted characters
- Database issues
- API failures
- Import/Export problems
- Search inconsistencies

---

## What Should Be Tested

### UI

- Unicode characters display correctly
- Forms accept UTF-8 input

### API

- Request body encoded as UTF-8
- Response body encoded as UTF-8
- Content-Type headers are correct

### Database

- Data stored without corruption
- Retrieved values match original input

### Files

- CSV
- JSON
- XML
- Excel
- PDF

---

## Recommended Test Data

```
Çınar
İstanbul
Straße
東京
北京
😀🚀
```

---

## QA Review Perspective

Ask:

- Is UTF-8 used consistently?
- Are HTTP headers correct?
- Can UTF-8 data survive the full request lifecycle?
- Are imported/exported files valid?

---

## Playwright Perspective

Automate scenarios where UTF-8 text is:

- Created
- Updated
- Searched
- Exported
- Imported

Verify displayed text exactly matches the original value.

---

## Common Mistakes

❌ Assuming UTF-8 is always configured correctly.

❌ Never validating exported files.

❌ Ignoring API response encoding.

❌ Ignoring database encoding.

---

## Checklist

□ UTF-8 input

□ UTF-8 API request

□ UTF-8 API response

□ Database storage

□ Search

□ Export

□ Import

□ UI rendering

---

## QA Cortex Guidance

Whenever text crosses system boundaries (UI → API → Database → Export), QA Cortex should recommend UTF-8 validation.

---

## References

Primary

- Unicode Standard

Related

- W3C Character Encoding