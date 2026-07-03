---
id: framework-detection
title: Framework & Version Detection Rules
category: Repository Analysis
priority: Critical
status: Draft
version: 1.0
---

# Framework & Version Detection Rules

## Purpose

Bu modül, hedef test otomasyon projesinde kullanılan test kütüphanesini ve sürümünü (version) kesin olarak tespit etmek ve buna uygun kural setini (Supported Rule Set) eşleştirmek için gerekli mantığı tanımlar.

---

## Detection Logic

### 1. Framework Identification Strategy
Aşağıdaki bağımlılıklar ve kod yapıları taranarak birincil test framework'ü belirlenir:

#### Playwright
- `package.json` içerisinde `@playwright/test` paketinin bulunması.
- Test dosyalarında `import { test, expect } from '@playwright/test'` ifadesinin yer alması.

#### Cypress
- `package.json` içerisinde `cypress` paketinin bulunması.
- Kodlarda `cy.visit()`, `cy.get()` gibi global nesne kullanımlarının tespiti.

#### Selenium
- `package.json` içerisinde `selenium-webdriver` paketinin bulunması.
- Kodlarda `Builder`, `By`, `until` gibi Selenium sınıflarının import edilmesi.

#### API Only
- Sadece `supertest`, `axios` veya Playwright'ın `@playwright/test` kütüphanesinin yalnızca API request mekanizmalarını (`request.post` vb.) kullanan ve UI etkileşimi barındırmayan projeler.

---

## 2. Version & Compatibility Detection

Sadece framework adı değil, yüklü olan sürümün de tespiti zorunludur.

### Sürüm Ayıklama Kuralı
- `package.json` dosyasındaki `dependencies` veya `devDependencies` altından ilgili paketin sürüm numarasını oku (Örn: `"@playwright/test": "^1.55.0"` -> `1.55.0`).

### Sürüm Uyumluluk Matrisi (Playwright Örneği)
- **>= 1.50.0**: En son yerleşik locator ve fixture API'leri desteklenir.
- **>= 1.27.0 ve < 1.50.0**: `getByRole`, `getByLabel` gibi modern locator'lar aktiftir fakat en güncel sürüm özellikleri (`expect.configure` vb.) sınırlıdır.
- **< 1.27.0**: `getByRole` gibi modern seçiciler bulunmaz, bu durumda `page.locator()` veya `page.click()` kullanımı için eski tip seçici kuralları uygulanır ve sürüm uyarısı verilir.

---

## Output Format

Framework tespiti sonrasında model şu çıktıyı sağlamalıdır:

```markdown
- **Detected Framework**: Playwright
- **Detected Version**: 1.55.0
- **Supported Rule Set**: Playwright Modern Ruleset (v1.50+)
- **Compatibility Notes**: No version compatibility warnings found. Fully compatible with modern locator recommendations.
```
