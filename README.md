# QA Cortex

> Repository-aware, rule-driven QA review engine for test automation projects.

**Status**: v1.0.0 release candidate. CLI, GitHub Action, MCP server, and VS Code client are available. The deterministic engine is calibrated against 40 benchmark cases across Playwright, Selenium WebDriver for Node.js, and Python Selenium.

---

## What is QA Cortex?

QA Cortex analyzes test automation projects and generates structured quality reports. It combines repository context, curated QA knowledge, deterministic local rules, signal-based framework adapters, and optional LLM-assisted review.

Without an API key, QA Cortex runs a local deterministic review for common issues such as brittle selectors, hardcoded waits, shared state, weak or missing assertions, resource cleanup gaps, and hardcoded test data. With an API provider configured, QA Cortex can enrich review workflows with LLM-assisted output.

### Key Features

- **Repository-aware analysis**: Reads project dependencies, framework config, Page Objects, custom fixtures, and Python project context before review.
- **Framework adapters**: Uses signal-based adapters for Playwright, Selenium WebDriver for Node.js, and Python Selenium.
- **Deterministic scoring**: Quality, risk, and maintainability scores are calculated from findings and repository context.
- **Evidence-based findings**: Findings include code evidence, severity, confidence, rule references, and concrete recommendations.
- **Benchmark suite**: 40 deterministic calibration cases with ground-truth JSON expectations.
- **GitHub Action support**: Reviews changed PR test files, or a configured `review-path`.
- **MCP server support**: Exposes file, repository, benchmark, and test design tools over stdio.
- **VS Code client**: Provides Problems panel diagnostics, Output reports, Status Bar, CodeLens, dashboard workflows, and test design analysis.
- **AI Editor Rules Integration**: Exports QA Cortex standards to `AGENTS.md`, `.cursorrules`, `.agents/AGENTS.md`, and `.github/copilot-instructions.md` for Codex, Cursor, Windsurf, Copilot, and other AI coding tools.

### Framework Support

| Framework / Language | Support Level | Notes |
| :--- | :--- | :--- |
| Playwright TypeScript/JavaScript | Supported | Review, scoring, benchmark, validation, CLI, MCP, GitHub Action, and VS Code workflows. |
| Selenium WebDriver for Node.js | Preview/Foundation | Adapter, deterministic rules, and benchmark coverage exist; broader repository calibration continues. |
| Python Selenium | Preview/Foundation | Python test scanning, dependency discovery, Selenium adapter, deterministic rules, CLI review, VS Code review, and benchmark coverage are available. |
| Python Playwright | Discovery-only | Python project and framework detection exist; dedicated Python Playwright review rules are not yet stable. |

---

## Installation

### VS Code Marketplace

QA Cortex VS Code Client is prepared for Marketplace release:

https://marketplace.visualstudio.com/items?itemName=qa-cortex.qa-cortex-vscode-client

If Marketplace validation is still pending, install the generated VSIX manually:

```powershell
code --install-extension "C:\Users\ridva\Desktop\qa-cortex\extensions\vscode\qa-cortex-vscode-client-1.0.0.vsix"
```

### Local CLI / Core

```bash
git clone https://github.com/ridvan-byr/qa-cortex.git
cd qa-cortex
npm install
npm run build
```

Optional global link:

```bash
npm link
```

---

## CLI Usage

Review a single file:

```bash
qa-cortex review tests/login.spec.ts
```

Review a directory:

```bash
qa-cortex review tests/
```

Run with verbose diagnostics:

```bash
qa-cortex review tests/ --verbose
```

Save JSON or SARIF output:

```bash
qa-cortex review tests/ --format json
qa-cortex review tests/ --format sarif
```

Fail the process when quality drops below a threshold:

```bash
qa-cortex review tests/ --fail-under 70
```

Run benchmark calibration:

```bash
qa-cortex benchmark
```

Export AI editor rules into a target project:

```bash
qa-cortex init-rules .
```

### CLI Options

| Option | Description | Default |
| :--- | :--- | :--- |
| `--help`, `-h` | Show usage guide | - |
| `--version`, `-v` | Show version number | - |
| `--verbose` | Print debug info such as routed rules and scores | `false` |
| `--format <type>` | Output format: `markdown`, `json`, or `sarif` | `markdown` |
| `--output <dir>` | Directory to save reports | `reviews/` |
| `--provider <name>` | LLM provider name | `gemini` |
| `--config <path>` | Path to `qa-cortex.config.json` | - |
| `--fail-under <score>` | Exit with code 1 if quality score is below the threshold | - |

---

## GitHub Action

```yaml
name: QA Cortex

on:
  pull_request:

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: ridvan-byr/qa-cortex@main
        with:
          github-token: ${{ github.token }}
          gemini-api-key: ${{ secrets.GEMINI_API_KEY }}
          max-files: '30'
```

If `review-path` is provided, the action scans that file or directory. Otherwise, it reviews changed `.spec.ts` and `.test.ts` files in the pull request.

---

## Architecture

```text
CLI / GitHub Action / MCP / VS Code Client
  |
  v
ReviewPipeline
  |
  +-- RepositoryLoader -> ContextBuilder
  +-- Framework Adapter Registry -> Framework Signals
  +-- KnowledgeRouter
  +-- Deterministic rules / optional LLM provider
  +-- ScoringEngine
  +-- ReportGenerator / PRCommentFormatter / SARIFExporter
```

---

## Benchmark

```bash
npm run build
qa-cortex benchmark
```

Latest local calibration result:

| Metric | Value |
| :--- | :--- |
| Benchmark cases | 40 |
| Passed | 40 |
| Failed | 0 |
| Precision | 100.0% |
| Recall | 100.0% |
| False Positives | 0 |
| False Negatives | 0 |
| Regression | None |

The benchmark suite covers Playwright, Selenium WebDriver for Node.js, and Python Selenium rules. It is used as deterministic regression coverage alongside real repository validation.

---

## VS Code Client

QA Cortex is available as a VS Code extension. The extension source lives under `extensions/vscode`.

Build and package locally:

```bash
cd extensions/vscode
npm run package
```

Available commands:

| Command | Description |
| :--- | :--- |
| `QA Cortex: Review Current Test File` | Reviews the active supported test file. |
| `QA Cortex: Review Selection` | Reviews the selected snippet or test block. |
| `QA Cortex: Review Changed Files` | Reviews changed supported test files from git diff. |
| `QA Cortex: Run Test Design Analysis` | Generates test design coverage analysis. |
| `QA Cortex: Open Latest Report` | Opens the latest Markdown report generated by the extension. |
| `QA Cortex: Clear Diagnostics` | Clears QA Cortex Problems panel diagnostics. |

Default configuration:

| Setting | Default |
| :--- | :--- |
| `qaCortex.reviewMode` | `rule-only` |
| `qaCortex.reviewOnSave` | `false` |
| `qaCortex.openReportAfterReview` | `false` |
| `qaCortex.showDiagnostics` | `true` |
| `qaCortex.showCodeLens` | `true` |
| `qaCortex.showStatusBar` | `true` |
| `qaCortex.telemetryEnabled` | `false` |

The VS Code client is designed to run in VS Code Extension Development Host on Windows, macOS, and Linux by relying on VS Code and Node path APIs rather than platform-specific shell behavior.

### Privacy & Telemetry

QA Cortex telemetry is strictly opt-in and disabled by default. When enabled, the VS Code client writes anonymized local telemetry events to extension storage for review, test design, crash, and feature usage events.

Telemetry never records file paths, repository URLs, source code, API keys, or secrets. Every event includes a schema version and the extension version for compatibility tracking.

---

## Validation Dataset

QA Cortex has been validated against real open-source Playwright repositories and calibrated through benchmark feedback loops.

Latest local validation run:

| Metric | Value |
| :--- | :--- |
| Repositories configured | 10 |
| Files reviewed | 231 |
| Findings generated | 2 |
| Average review time (Rule Engine) | 2ms |
| Average review time (LLM Mode) | ~1 - 3 seconds |
| LLM provider comparison | Deferred |

Manual triage of the findings is logged in `validation/reports/latest-validation-report.md`. The local deterministic engine reviewed 231 files in 2ms per file and identified 2 high-confidence true positives.

---

## License

MIT