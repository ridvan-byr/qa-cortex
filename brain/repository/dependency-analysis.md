---
id: dependency-analysis
title: Dependency Analysis Rules
category: Repository Analysis
priority: Medium
status: Draft
version: 1.0
---

# Dependency Analysis Rules

## Purpose

Bu modül, test projesinin `package.json` dosyasındaki bağımlılıkları, test kalitesini ve geliştirme standartlarını destekleyen ek araçları analiz etmek için gereken kuralları tanımlar.

---

## Analysis Criteria

QA Brain, `package.json` dosyasını tararken aşağıdaki kütüphanelerin ve konfigürasyonların varlığını gözlemler:

### 1. Kod Kalitesi ve Formatlama
- **ESLint**: JavaScript/TypeScript statik kod analizi için kurulu olup olmadığını kontrol eder.
- **Prettier**: Kod formatlama tutarlılığı için kurulu olup olmadığını kontrol eder.

### 2. Git commit ve push kancaları (Git Hooks)
- **Husky**: Commit veya push öncesinde testlerin veya linter'ların otomatik çalışmasını sağlayan kancaları kontrol eder.
- **lint-staged**: Sadece commit edilmek üzere sahnelenmiş (staged) dosyaların linter'dan geçirilmesini kontrol eder.

---

## Gözlem ve Puanlama Kuralı (Observation, Not Penalty)

> [!IMPORTANT]
> Husky, ESLint, Prettier veya lint-staged gibi araçların projede bulunmaması **Quality Score (Kalite Skoru) veya Maintainability Score (Bakım Skoru) üzerinde negatif bir puanlama cezasına yol açmaz.**
> 
> Bu araçların eksikliği durumunda QA Brain, bunu bir bulgu (Finding) olarak raporlamak yerine, raporun **Observations (Gözlemler)** bölümünde bir geliştirme tavsiyesi olarak sunmalıdır.

---

## Expected Output

Analiz sonucunda aşağıdaki şemada gözlemler listelenir:

```markdown
- **Observations**:
  - [✓/✗] ESLint static code quality checker detected.
  - [✓/✗] Prettier code formatter configuration detected.
  - [✓/✗] Husky git commit hooks integration detected.
  - [✓/✗] lint-staged files manager configuration detected.
```
