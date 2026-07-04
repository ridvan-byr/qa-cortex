# QA Brain Roadmap

QA Brain is an AI-powered Quality Engineering engine designed to perform whole-project evaluations on test automation repositories, producing senior-level QA audit reports.

This roadmap details completed sprints and outlines the path toward building the core engine and its various client integrations.

---

## Roadmap Overview

```
                                 QA Brain
                                    │
    ┌───────────────────────────────┴───────────────────────────────┐
    ▼                                                               ▼
[Completed Sprints]                                      [Future Coding Sprints]
  ✓ Sp 1-2: Knowledge Base                                  ⬜ Sp 7: Calibration & Benchmarks
  ✓ Sp 3-4: Review Logic                                    ⬜ Sp 8: CLI Development
  ✓ Sp 5A: Repository Intelligence                          ⬜ Sp 9: GitHub Action Integration
  ✓ Sp 5B: Architecture Intelligence                        ⬜ Sp 10: MCP Server Protocol
  ✓ Sp 6: Core Engine                                       ⬜ v1.0: Stable Release
```

---

## Completed Sprints

### ✅ Sprint 1 & 2 — Knowledge Base
- [x] ISTQB Test Design Techniques (BVA, Equivalence Partitioning).
- [x] Google Testing Practices (Test Smells, Flakiness Mitigation).
- [x] OWASP Security Verification & Injection Test Data.
- [x] Microsoft Testing Playbook (Data Variation, Failure Paths).
- [x] Unicode & W3C Internationalization Standards.

### ✅ Sprint 3 & 4 — Review Logic
- [x] General Review Principles (10 Golden Rules).
- [x] Multi-dimensional Scoring Engines (Coverage, Quality, Risk, Confidence).
- [x] Structured Report Layout Specification (`response-format.md`).

### ✅ Sprint 5A — Repository Intelligence
- [x] Modular repository analysis structure (`brain/repository/`).
- [x] Dependency scanning rules (`package.json`).
- [x] Global configuration scanning rules (`playwright.config.ts`).
- [x] Prioritized loading orchestration (`repository-loading.md`).
- [x] Self-testing harness for engine validation (`tests/`).

### ✅ Sprint 5B — Architecture Intelligence
- [x] Page Object Model (POM) encapsulation and Selector Leak detection rules.
- [x] State isolation, global mutable state, and context sharing detection rules.
- [x] Deterministic review sequence mapping (`repository-review-flow.md`).
- [x] Integrated Mandatory Code Evidence and Architecture Confidence scores.

### ✅ Sprint 6 — Core Engine
- [x] Developed the core QA Brain engine code to dynamically read, load, and execute review rules and prompts.
- [x] Implemented decoupled ReviewPipeline, neutral ContextBuilder, and Gemini LLM provider.
- [x] Decoupled mathematical ScoringEngine and ReportGenerator.

### ✅ Sprint 7 — Calibration & Benchmark Suite
- [x] Established programmatic evaluation and benchmark dataset under `benchmarks/`.
- [x] Coded `BenchmarkRunner.ts` to calculate Precision, Recall, and False Positives.
- [x] Integrated rule-routing optimization stats and millisecond-based execution tracking.
- [x] Calibrated findings deduplication and css/xpath resilient locator checks.

---

## Future Roadmap

### ✅ Sprint 8 — CLI & Real Repository Scanning
- [x] CLI entry point (`src/cli.ts`) with `review`, `benchmark`, `--help`, `--version`, `--verbose`, `--format`, `--output`, `--provider`, `--config` support.
- [x] Recursive directory scanning with progress tracking and Repository Summary output.
- [x] Exit Code 1 on critical/high findings for CI/CD compatibility.
- [x] TypeScript compilation to `dist/` and global `npm link` registration.
- [x] Professional `README.md` with CLI usage guide, architecture diagram, and benchmark results.

### ✅ Sprint 9 — GitHub Action Integration
- [x] Implemented GitHub Action entry point (`src/action.ts`) utilizing dynamic imports for CommonJS compatibility.
- [x] Created `DiffDetector` with custom glob-to-regex ignore support (`**/generated/**`) to filter changed test files.
- [x] Designed `PRCommentFormatter` supporting PR summaries, detailed findings list, and GitHub Step Summaries.
- [x] Packaged with branding, inputs (max-files, ignore), and outputs in `action.yml`.
- [x] Added automated integration tests under `tests/action-integration/`.

### ✅ Sprint 10 — MCP Server Integration
- [x] Created `Scanner.ts` shared module with deterministic sorting, glob-based ignore patterns, and repository scan aggregation.
- [x] Implemented MCP Server (`src/mcp.ts`) with stdio transport: `review_file`, `review_repository`, `run_benchmark` tools.
- [x] Rich tool descriptions optimized for AI agent discovery (Cursor, Claude Desktop, Antigravity).
- [x] Dynamic version reading from `package.json`.
- [x] Refactored `cli.ts` to use shared `Scanner` module (code deduplication).
- [x] Fixed `globToRegex` placeholder bug across `Scanner` and `DiffDetector`.

### ⬜ Sprint 11 — Real Repository Validation
- **Objective**: Run QA Brain on 10+ open-source Playwright repos and measure real-world Precision/Recall.

### ⬜ Sprint 12 — VS Code Extension
- **Objective**: Provide native VS Code integration for inline test review feedback.

### ⬜ Sprint 13 — Multi-framework Support
- **Objective**: Expand rule sets to support Cypress, Selenium, and other test frameworks.

### ⬜ v1.0 — Stable Release
- **Objective**: Reach production stability with validated accuracy metrics and full documentation.
