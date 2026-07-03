---
id: page-object-analysis
title: Page Object Model (POM) Analysis Rules
category: Repository Analysis
priority: High
status: Draft
version: 1.0
---

# Page Object Model (POM) Analysis Rules

## Purpose

Bu modül, projedeki Page Object Model (POM) kalitesini, sayfa nesnelerinin kapsüllenmesini (encapsulation) ve seçicilerin test dosyalarına sızmasını (Selector Leak) denetleyen kuralları tanımlar.

---

## 1. Selector Leak (Seçici Sızıntısı) Tespiti

En kritik POM kural ihlallerinden biri, sayfa yapısı bir POM sınıfı ile soyutlanmışken, seçicilerin spec dosyası içerisine sızmasıdır.

### Kural Tanımı
- **Tetikleyici (Trigger)**: Eğer bir spec dosyası (`*.spec.ts`) bir POM sınıfını import ediyorsa ve/veya instance oluşturuyorsa (`const loginPage = new LoginPage(page)`);
- **İhlal (Violation)**: Spec dosyası içinde doğrudan `page.locator('xpath=...')`, `page.locator('//button')` veya `page.locator('div > input')` gibi eleman etkileşimleri yapılıyorsa, bu durum bir **Selector Leak** bulgusu olarak raporlanır.
- **Kanıt Zorunluluğu (Mandatory Evidence)**: Raporlanan her sızıntı bulgusu, spec dosyasından doğrudan ilgili kod satırını kanıt (Evidence) olarak göstermek zorundadır.

---

## 2. POM Bulunabilirlik Esnekliği (POM Presence Check)

Eğer proje genelinde hiçbir POM sınıfı bulunamazsa:
- **Düşük Riskli Projeler (Low Risk)**: Eğer test suite çok küçükse (3 spec dosyasından az) ve test edilen özellikler düşük riskli ise, POM bulunmaması doğrudan bir ceza puanı (penalty) olarak yansıtılmaz. Sistem bunu "Bulunamadı (Not Found)" olarak işaretler.
- **Yüksek Riskli Projeler (High/Critical)**: Büyük ve iş kritik projelerde POM bulunmaması, Maintainability (Bakım) puanı üzerinden ceza almaya sebep olur.

---

## 3. POM Metot Granülaritesi (Granularity)

POM metotları, teknik locator etkileşimlerinden ziyade kullanıcı davranışlarını temsil etmelidir.
- **Doğru**: `await loginPage.login(email, password)`
- **Yanlış**:
  ```typescript
  await loginPage.emailInput.fill(email);
  await loginPage.passwordInput.fill(password);
  await loginPage.submitButton.click();
  ```
  *(Seçici elemanları sınıf dışına açık (public getter) olmamalı, metotların içinde kapsüllenmelidir).*

---

## Expected Output

POM analizi sonucunda şu özet üretilmelidir:

```markdown
- **POM Architecture Rating**: [Excellent / Good / Needs Improvement / Not Found]
- **Architecture Confidence**: [Percentage]% (Reason: POM structure mapped with specs)
- **Detected Architecture Leaks**: 
  - [Evidence snippet of selector leak, or "None"]
```
