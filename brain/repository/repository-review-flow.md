---
id: repository-review-flow
title: Repository Review Flow
category: Repository Analysis
priority: High
status: Draft
version: 1.0
---

# Repository Review Flow

## Purpose

Bu doküman, QA Cortex'in bir depoyu (repository) baştan sona analiz ederken izlemesi gereken deterministik iş akışını (pipeline) ve adımların sırasını tanımlar.

---

## Analiz Akış Şeması (Review Pipeline)

QA Cortex bütünsel analiz yaparken aşağıdaki sırayı birebir takip etmelidir:

```
Step 1: Configuration Analysis (playwright.config.ts)
                    │
                    ▼
Step 2: Dependency & Version Check (package.json, tsconfig)
                    │
                    ▼
Step 3: Test Organization mapping (directories discovery)
                    │
                    ▼
Step 4: POM Architecture analysis (Page Object Classes mapping)
                    │
                    ▼
Step 5: Fixtures & State Isolation evaluation (test.extend, globals)
                    │
                    ▼
Step 6: Utilities & Custom Commands verification
                    │
                    ▼
Step 7: Mock & Data resources checking (assets/, mock-data/)
                    │
                    ▼
Step 8: Split Coverage calculations (File & Feature Coverage)
                    │
                    ▼
Step 9: Final Review generation (Observations & Recommendations)
```

---

## Akış Kuralları

- **Sırayı Atlamama Kuralı**: QA Cortex, projenin bağımlılık ve konfigürasyonunu tam olarak haritalandırmadan test dosyalarının (`spec.ts`) kalitesini veya sızıntılarını incelemeye başlamamalıdır.
- **Modüler Kuralların Yüklenmesi**: Her adım, orkestrasyonun `repository-loading.md` tablosunda belirttiği ilgili markdown kurallarını yükleyerek çalışır.
