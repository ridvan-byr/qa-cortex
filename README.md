# QA Brain

> Repository-aware, rule-driven QA review engine for Playwright test automation.

**Status**: v0.1.0 - CLI, GitHub Action, and MCP prototype ready.

---

## What is QA Brain?

QA Brain analyzes Playwright test suites and generates structured quality reports. It combines repository context, curated QA knowledge, deterministic local rules, and optional Gemini review output.

When `GEMINI_API_KEY` is available, QA Brain asks Gemini to review the selected test against routed rule files. Without an API key, it runs a local deterministic rule review for common issues such as brittle selectors, hardcoded waits, shared state, and missing assertions.

### Key Features

- **Repository-aware analysis**: Reads `package.json`, `playwright.config.ts`, Page Objects, and custom fixtures before review.
- **Signal-based knowledge routing**: Loads only the rule files relevant to the target spec.
- **Deterministic scoring**: Quality, risk, and maintainability scores are calculated from findings and context.
- **Evidence-based findings**: Findings include code evidence and concrete recommendations.
- **Benchmark suite**: Built-in calibration runner with ground-truth JSON files.
- **GitHub Action support**: Reviews changed PR test files, or a configured `review-path`.
- **MCP server support**: Exposes file, repository, and benchmark review tools over stdio.

---

## Installation

```bash
git clone https://github.com/ridvan-byr/qa-brain.git
cd qa-brain
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
qa-brain review tests/login.spec.ts
```

Review a directory:

```bash
qa-brain review tests/
```

Run with verbose diagnostics:

```bash
qa-brain review tests/ --verbose
```

Save JSON output:

```bash
qa-brain review tests/ --format json
```

Run benchmark calibration:

```bash
qa-brain benchmark
```

### CLI Options

| Option | Description | Default |
| :--- | :--- | :--- |
| `--help`, `-h` | Show usage guide | - |
| `--version`, `-v` | Show version number | - |
| `--verbose` | Print debug info such as routed rules and scores | `false` |
| `--format <type>` | Output format: `markdown` or `json` | `markdown` |
| `--output <dir>` | Directory to save reports | `reviews/` |
| `--provider <name>` | LLM provider. Currently only `gemini` is supported. | `gemini` |
| `--config <path>` | Path to `qa-brain.config.json` | - |

---

## GitHub Action

```yaml
name: QA Brain

on:
  pull_request:

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: ridvan-byr/qa-brain@v0.1.0
        with:
          github-token: ${{ github.token }}
          gemini-api-key: ${{ secrets.GEMINI_API_KEY }}
          max-files: '30'
```

If `review-path` is provided, the action scans that file or directory. Otherwise, it reviews changed `.spec.ts` and `.test.ts` files in the pull request.

---

## Architecture

```text
CLI / GitHub Action / MCP
  |
  v
ReviewPipeline
  |
  +-- RepositoryLoader -> ContextBuilder
  +-- KnowledgeRouter
  +-- GeminiProvider or deterministic rule fallback
  +-- ScoringEngine
  +-- ReportGenerator / PRCommentFormatter
```

---

## Benchmark

```bash
npm run build
qa-brain benchmark
```

The benchmark suite is useful for regression checks, but it is not a substitute for real repository validation. Real-world validation across open-source Playwright repositories is planned in Sprint 11.

---

## Validation Dataset

Sprint 11 validation was completed against 10 open-source Playwright repositories.

Latest local validation run:

| Metric | Value |
| :--- | :--- |
| Repositories configured | 10 |
| Files reviewed | 229 |
| Findings generated | 2 |
| Average review time | 1ms |
| Rule coverage entries | 13 |
| LLM provider comparison | Deferred |
| Final active findings | 2 true positives |

Manual triage of the final 5 findings found 2 true positives, 2 observation candidates, 1 rule improvement candidate, and 0 clear false positives. Demo/example missing assertion signals were downgraded, leaving 2 active findings.

The latest generated report is available at `validation/reports/latest-validation-report.md`.
Manual triage details are available at `validation/reports/manual-triage-report.md`.
Sprint 11 final report is available at `validation/reports/sprint-11-final-report.md`.

---

## License

MIT
