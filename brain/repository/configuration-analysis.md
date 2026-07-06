---
id: configuration-analysis
title: Configuration Analysis Rules
category: Repository Analysis
priority: High
status: Draft
version: 1.0
---

# Configuration Analysis Rules

## Purpose

Bu modül, test otomasyonunun çalışma ortamı ayarlarını belirleyen `playwright.config.ts` (veya `.js`) dosyasını analiz etme kurallarını tanımlar. Konfigürasyon kalitesi, testlerin hızı, paralelliği ve hata yakalama yeteneğini doğrudan etkiler.

---

## Analysis Criteria

QA Cortex, konfigürasyon dosyasını okurken aşağıdaki alanları analiz eder:

### 1. Eşzamanlılık ve Paralel Çalışma (Concurrency)
- **`fullyParallel`**: `true` olmalıdır. Aksi halde testler tek tek çalıştırılarak zaman kaybına neden olur.
- **`workers`**: Toplam çalışan sayısını belirtir. CI ortamlarında ve yerelde sistem kaynaklarına göre optimize edilmelidir. Tek worker (`workers: 1`) tespiti durumunda bir stabilite uyarısı verilir.

### 2. Zaman Aşımları (Timeouts)
- **`timeout`**: Genel test zaman aşımı limitidir (Örn: 30000ms). Aşırı yüksek timeouts testlerin takılıp kalmasına yol açar.
- **`expect.timeout`**: Assertion'lar için otomatik bekleme süresidir (Varsayılan 5000ms).

### 3. Tarayıcı Matrisi (Projects)
- **`projects`**: Testlerin hangi tarayıcılarda (Chromium, Firefox, WebKit) ve hangi cihaz profillerinde (Mobile Chrome vb.) koşulacağını doğrular. En azından Chromium ve Firefox gibi çapraz tarayıcı desteği gözlemlenmelidir.

### 4. Hata Yakalama ve Raporlama (Trace, Video, Screenshot)
- **`trace`**: Hata analizi için `'on-first-retry'` veya `'retain-on-failure'` modunda olmalıdır. Tamamen `'off'` olması durumunda analiz uyarısı verilir.
- **`video`** & **`screenshot`**: Hata anlarında görsel kanıt toplamak için konfigüre edilmiş olmalıdır.

### 5. Ortam ve Kimlik Doğrulama Paylaşımı
- **`baseURL`**: Testlerin hedef sunucu adresidir. Kod içine hardcoded URL yazılmasını engellemek için burada tanımlanmış olmalıdır.
- **`storageState`**: Login durumunu saklayıp diğer testlerle paylaşarak mükerrer oturum açma işlemlerini engelleme yeteneğidir.

---

## Expected Output

Analiz sonucunda aşağıdaki şemada konfigürasyon analizi çıktısı üretilir:

```markdown
- **Detected Configuration**:
  - Workers: [Value] (Fully Parallel: [true/false])
  - Timeouts: Test Timeout [Value]ms, Expect Timeout [Value]ms
  - Browser Matrix: [List of browsers, e.g. chromium, firefox]
  - Error Capture: Trace [Value], Video [Value], Screenshot [Value]
  - Global Base URL: [URL / "Not Configured"]
```
