---
id: project-structure-analysis
title: Project Structure Analysis Rules
category: Repository Analysis
priority: High
status: Draft
version: 1.0
---

# Project Structure Analysis Rules

## Purpose

Bu modül, hedef test otomasyon projesinin dosya ve klasör yerleşim düzenini analiz etmek için gerekli esnek arama kurallarını tanımlar. Her projenin dizin yapısı farklı olabileceği için esnek bir tarama stratejisi izlenir.

---

## Directory Discovery Strategy

QA Cortex, test bileşenlerinin yerini tespit etmek için aşağıdaki klasör adlandırma varyasyonlarını tarar:

### 1. Test Dosyaları Klasörü (Test Suite Location)
- `tests/`
- `e2e/`
- `spec/`
- `specs/`
- `integration/`

### 2. Sayfa Nesneleri Klasörü (Page Objects Location)
- `pages/`
- `page-objects/`
- `src/pages/`
- `pom/`

### 3. Fixture ve Konfigürasyon Dosyaları (Fixtures Location)
- `fixtures/`
- `helpers/`
- `utils/`
- `fixtures.ts` veya `fixtures.js` (Spec dosyalarının yanında veya kökte)

### 4. Test Verisi Klasörü (Mock & Data Location)
- `data/`
- `mocks/`
- `assets/`
- `test-data/`

---

## Analysis Sequence

1. Proje kökünden başlayarak klasör ağacını çıkar.
2. Yukarıdaki klasörlerden eşleşenleri bulup rollerini ata.
3. Bulunan dosya eşleşmelerini test analizi sırasında "İlişkili Dosyalar" (Related Files) olarak kullanması için `Knowledge Router` katmanına bildir.

---

## Expected Output

Yapısal analiz sonucunda aşağıdaki özet çıkarılmalıdır:

```markdown
- **Detected Project Structure**:
  - Tests Location: `examples/` (or `tests/`)
  - Page Objects Location: `examples/good/` (classes identified)
  - Fixtures Location: `examples/good/checkout.spec.ts` (extended test instances)
  - Mock Assets: `assets/`
```
