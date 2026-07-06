---
id: turkish-characters
title: Turkish Character Testing
category: localization
priority: critical
source: Unicode Standard
owner: QA Cortex
status: verified
version: 1.0
tags:
  - turkish
  - unicode
  - localization
related:
  - unicode-testing
---

# Turkish Character Testing

## Purpose

Turkish has several language-specific characters that frequently expose defects in validation, search, sorting and uppercase/lowercase conversion.

---

## Critical Characters

```
Ç
Ğ
İ
Ö
Ş
Ü

ç
ğ
ı
ö
ş
ü
```

---

## High Risk Characters

```
I
İ
i
ı
```

These four characters are responsible for many production bugs.

---

## Typical Problems

### Validation

Rejecting Turkish letters.

---

### Search

Searching

```
İstanbul
```

fails when searching

```
istanbul
```

---

### Uppercase Conversion

Incorrect

```
istanbul

↓

ISTANBUL
```

Correct (Turkish Locale)

```
İSTANBUL
```

---

### Lowercase Conversion

Incorrect

```
I

↓

i
```

Correct (Turkish)

```
ı
```

---

### Sorting

Incorrect alphabetical ordering.

---

### Export

Characters become

```
???
```

or

```
Ã‡
```

---

## Recommended Test Data

```
Çağlar

Şule

İpek

Işık

Çınar

Doğukan

Gökçe

Özgür

Ümit
```

---

## QA Review Perspective

Ask

- Are Turkish characters accepted?

- Can they be searched?

- Can they be updated?

- Are exports correct?

- Is sorting correct?

---

## Playwright Perspective

Whenever QA Cortex detects a text input, suggest at least one Turkish dataset.

---

## Checklist

□ Create

□ Update

□ Search

□ Sort

□ Export

□ API

□ Validation

□ Database

---

## QA Cortex Guidance

Turkish datasets should automatically be suggested whenever the application supports Turkish users or does not explicitly restrict language input.

---

## References

Primary

- Unicode Standard

Related

- W3C Internationalization