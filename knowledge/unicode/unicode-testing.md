---
id: unicode-testing
title: Unicode Testing
category: internationalization
priority: critical
source: Unicode Standard
owner: QA Brain
status: verified
version: 1.0
tags:
  - unicode
  - utf8
  - internationalization
related:
  - turkish-characters
  - localization
  - character-encoding
---

# Unicode Testing

## Purpose

Unicode Testing verifies that applications correctly process, store, search, transmit and display characters from every supported language.

Modern software must support Unicode consistently across the entire system.

---

## Why It Matters

Applications often work correctly using English text but fail when Unicode characters are entered.

Common failures include:

- Database corruption
- Search failures
- Encoding issues
- Sorting problems
- Validation bugs
- UI rendering issues

---

## What Should Be Tested

### Input

- Accept Unicode

### Storage

- Save correctly

### Retrieval

- Read correctly

### Search

- Find Unicode values

### Sorting

- Correct locale ordering

### Export

- CSV
- PDF
- Excel
- JSON

### API

- Request Encoding
- Response Encoding

---

## Recommended Test Data

Latin

```
John
```

Turkish

```
ÇĞİÖŞÜ
çğıöşü
İstanbul
```

German

```
Straße
```

French

```
Élodie
```

Japanese

```
東京
```

Chinese

```
北京
```

Arabic

```
محمد
```

Hindi

```
भारत
```

Emoji

```
😀🚀🎉
```

---

## QA Review Perspective

Ask:

- Is Unicode accepted?

- Is Unicode stored correctly?

- Can Unicode be searched?

- Is Unicode exported correctly?

---

## Playwright Perspective

Instead of

```ts
await page.fill("#name","John");
```

also test

```ts
Çınar

İstanbul

Straße

東京

😀User
```

---

## Common Mistakes

❌ Testing only ASCII.

❌ Testing only English.

❌ Ignoring search.

❌ Ignoring export.

---

## Checklist

□ Input

□ Save

□ Read

□ Search

□ Update

□ Delete

□ Export

□ API

□ UI

---

## QA Brain Guidance

Whenever an input field exists, QA Brain should recommend Unicode scenarios unless the business explicitly restricts accepted characters.

---

## References

Primary

- Unicode Standard

Related

- W3C Internationalization