# QA Brain

**QA Brain** is an AI-powered Quality Engineering & Test Design assistant designed to analyze your test automation repositories (Playwright and Selenium WebDriver), perform code reviews, identify missing test scenarios, and present insights through a rich, native-themed visual workbench dashboard.

It scans your test specs for brittle locators, Page Object Model (POM) encapsulation leaks, waiting strategy issues, test state isolation, and lifecycle teardown cleanup.

---

## 🚀 Key Features

### 1. 🧠 AI-Powered Test Code Review
* Deeply audits Playwright & Selenium test specs for anti-patterns (such as static timeouts, xpath leaks, or bypass of page objects).
* Highlights the exact issue location (`Evidence`), severity classification (`Severity`), and actionable solutions (`Recommendation`).
* Simply click on any finding card in the dashboard to jump directly to the target line of code.

### 2. 🧪 ISTQB-Based Test Design Workbench
* Automatically analyzes test files to identify missing test scenarios based on ISTQB BVA (Boundary Value Analysis) and ECP (Equivalence Partitioning) standards.
* Generates ready-to-use boilerplate test templates for both **Playwright** and **Selenium** frameworks.
* Copy templates or insert them directly at your active cursor location with a single click.

### 3. ⚙️ Direct LLM Configuration UI
* Configure your AI preferences directly inside the Dashboard sidebar by clicking the **⚙️ (Cog)** icon:
  * Select your provider: **Gemini API, OpenAI (ChatGPT), Anthropic (Claude), or OpenRouter**.
  * Paste your API Key and customize the model name or API endpoint URL instantly.

### 4. 📈 Quality, Risk & Maintainability Metrics
* Evaluates key metrics like Quality Score, Feature Risk, and Maintainability.
* Visually tracks score deltas (`Deltas`) as your test suite improves.
* Summarizes workspace-level insights (top violated rules, most risky spec files, and code recommendations).

---

## 🛠️ How to Use

1. Install the extension and click the **🧠 QA Brain** icon in the Activity Bar to open the Dashboard.
2. Click the **⚙️** (Cog) icon at the top of the panel to select your provider and save your API Key.
3. Open any supported test file and right-click inside the editor:
   * Select **`QA Brain: Review Current Test File`** to audit the entire spec.
   * Or highlight a specific block of code and select **`QA Brain: Review Selection`** to run a context-limited review.
4. Interact with audit results, metrics, and templates directly from the Dashboard tabs (Review, Design, Coverage, Metrics, Insights).

---

## ⚙️ Configuration Settings

You can customize the following settings via VS Code Settings (`settings.json`):

* `qaBrain.apiProvider`: Select the LLM provider (`Gemini`, `OpenAI`, `Anthropic`, `OpenRouter`).
* `qaBrain.apiKey`: The API Key for the selected provider.
* `qaBrain.apiModel`: Optional override for the model name (e.g. `gpt-4o`, `claude-3-5-sonnet-latest`).
* `qaBrain.apiEndpoint`: Optional custom endpoint URL for proxies or OpenRouter targets.
* `qaBrain.reviewOnSave`: Automatically triggers a review whenever a test file is saved (Default: `false`).
* `qaBrain.showDiagnostics`: Shows red/yellow warning squiggles and populates the Problems panel (Default: `true`).
* `qaBrain.showCodeLens`: Shows QA Brain CodeLens summaries at the top of test files (Default: `true`).

---

## 📄 License
This project is licensed under the **MIT License**. See [LICENSE.txt](LICENSE.txt) for details.
