---
id: fixture-analysis
title: Fixture & Isolation Analysis Rules
category: Repository Analysis
priority: High
status: Draft
version: 1.0
---

# Fixture & Isolation Analysis Rules

## Purpose

Bu modül, projedeki test izolasyonunu, özel fixture (custom fixture) kalitesini ve testler arasındaki tarayıcı/veri paylaşımı risklerini analiz eden kuralları tanımlar.

---

## 1. Test İzolasyonu ve Context Paylaşımı (State Isolation)

Her testin bağımsız ve sıfırdan başlamış bir tarayıcı oturumunda (isolated browser context) çalışması gerekir.

### Denetim Kuralları
- **Ortak Context Tespiti (Shared Context)**: Birden fazla testin `browser.newContext()` ile yaratılan tek bir context'i veya tek bir `page` nesnesini temizlemeden sırayla kullanması (reused browser session) durumunu tespit et.
- **Global Durum Paylaşımı (Global State Leaks)**: Test dosyası seviyesinde tanımlanmış ve test adımları tarafından yazılıp okunan mutable global değişkenleri (`let userId = ...`, `let createdItem = ...`) kontrol et.
- **Kanıt Zorunluluğu (Mandatory Evidence)**: İzolasyon ihlali tespit edilen her bulgu, ilgili global değişken tanımını veya context paylaşım kodunu kanıt olarak göstermek zorundadır.

---

## 2. beforeEach / beforeAll Blokları Analizi

Aşırı karmaşık ve her testten önce tekrarlayan kurulumlar (setup) test performansını düşürür ve bakımı zorlaştırır.
- **beforeAll Misuse**: Çok büyük `beforeAll` bloklarında tarayıcıyı açık tutup tüm testleri o oturumda koşturma eğilimini (e.g. login once, run 10 tests sequentially in the same page) tespit et ve uyar.

---

## 3. Custom Fixture Değerlendirmesi

Playwright'ın en güçlü yanlarından biri `test.extend` ile özel fixture'lar oluşturabilmesidir.
- **Kural**: Ortak login veya veri hazırlığı adımları `beforeEach` içinde kopyalanıp yapıştırılmak yerine, `authenticatedPage` veya `apiClient` gibi custom fixture'lar içine taşınmış olmalıdır.
- **Ceza/Tavsiye**: Fixture kullanılmaması durumunda, eğer testler bağımsızsa puan kırılmaz, sadece tekrar eden setup'lar için iyileştirme gözlemi (Improvement Observation) eklenir.

---

## Expected Output

Fixture analizi sonucunda şu özet üretilmelidir:

```markdown
- **Fixture & State Isolation Rating**: [Excellent / Good / Needs Improvement / Poor]
- **Detected Isolation Violations**:
  - [Evidence snippet of shared state or context sharing, or "None"]
```
