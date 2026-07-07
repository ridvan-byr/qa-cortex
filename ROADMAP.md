# QA Cortex Roadmap

QA Cortex is an AI-powered Quality Engineering engine designed to perform whole-project evaluations on test automation repositories, producing senior-level QA audit reports.

This roadmap details completed sprints and outlines the path toward building the core engine and its various client integrations.

---

## Product Milestones

| Milestone | Focus | Status |
| :--- | :--- | :--- |
| v0.1.0 | Core stability, Vitest migration, GitHub Actions CI, and generalization | Completed |
| v0.2.0 | Python Adapter and calibration on Python repositories | Completed |
| v1.0.0 | Stable release gates and production-ready quality gates | Completed |

Framework support labels are defined in `docs/framework-support-policy.md`.

---

## Roadmap Overview

```
                                 QA Cortex
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
- [x] Developed the core QA Cortex engine code to dynamically read, load, and execute review rules and prompts.
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

### ✅ Sprint 11 — Real Repository Validation
- **Objective**: Run QA Cortex on 10+ open-source Playwright repos and measure real-world Precision/Recall.
- **Status**: Completed.
- [x] Created validation workspace under `validation/`.
- [x] Added `ValidationRunner` for repository selection checks, rule coverage, review time, and finding triage reports.
- [x] Added `qa-cortex validate [config]` CLI command and `npm run validate` script.
- [x] Selected and cloned 10 open-source Playwright repositories locally for the initial validation run.
- [x] Generated initial Rule Only validation report: 10 repositories, 226 files reviewed, 59 findings, 13 rule coverage entries.
- [x] Calibrated noisy assertion/isolation heuristics and reduced findings from 59 to 26 while keeping benchmark suite green.
- [x] Added framework/demo path-aware Missing Assertion filtering and reduced findings from 26 to 5 while keeping benchmark suite green.
- [x] Flagged no-spec repositories as excluded from active validation coverage.
- [x] Completed manual triage for the final 5 findings: 2 true positives, 2 observation candidates, 1 rule improvement candidate, 0 clear false positives.
- [x] Added benchmark cases for fixture-heavy reset flows and DB/API-adjacent tests without result assertions.
- [x] Downgraded demo/example missing assertion signals and reduced active findings from 5 to 2.
- [x] Converted final triage outcomes into benchmarks, rule improvement backlog, or documented justification.
- [x] Replaced no-spec small repository with `microsoft/playwright-mcp`; final validation covers 10 repositories and 229 files.
- [x] Published final Sprint 11 validation report and v0.9 RC recommendation.

Follow-up after Sprint 11:
- Add per-test-block assertion analysis instead of file-level assertion detection.
- Run LLM provider comparison after OpenAI/Gemini/Claude API usage is available.

### ✅ Sprint 12 — VS Code Client
- **Objective**: Provide native VS Code client integration for rule-only Playwright test review feedback.
- **Status**: Completed.
- [x] Planned VS Code Client MVP scope in `docs/implementation-plan.md`.
- [x] Created isolated extension package under `extensions/vscode`.
- [x] Added rule-only review integration using the existing QA Cortex core pipeline.
- [x] Added commands for current file, selection, changed files, latest report, and diagnostics clearing.
- [x] Added Problems panel diagnostics, Output Channel report, Status Bar, and CodeLens support.
- [x] Added config defaults for `reviewOnSave`, `openReportAfterReview`, diagnostics, CodeLens, and Status Bar.
- [x] Added graceful review error handling with user-facing notifications.
- [x] Verified Extension Development Host smoke test on local VS Code setup.
- [x] Completed final build/test/benchmark validation with no regression.

### ✅ Sprint 13A — Core Adapter & Signal Architecture
- **Objective**: Prepare QA Cortex core for framework adapters without changing current Playwright behavior.
- **Status**: Completed.
- [x] Add small `FrameworkAdapter` API.
- [x] Add `FrameworkSignal` and `FrameworkContext` types.
- [x] Add adapter registry.
- [x] Add initial Playwright bridge adapter without changing review behavior.
- [x] Add automated adapter registry smoke test.
- [x] Keep current Playwright benchmark suite green.
- [x] Run Sprint 11 validation smoke after adapter integration.
- [x] Run VS Code Client compile smoke after adapter integration.
- [x] Run VS Code Extension Development Host smoke after adapter integration.

Out of scope:
- Selenium full support.
- Package/plugin split.
- Cypress/WebdriverIO/Appium support.
- Test Design Engine.
- Marketplace publish.

### ✅ Sprint 13B — Playwright Adapter Migration + Generic Rules
- **Objective**: Move current Playwright behavior behind the adapter layer and separate generic QA rules from framework-specific rules.
- **Status**: Completed.
- [x] Migrate Playwright routing signals into `PlaywrightAdapter`.
- [x] Route Playwright knowledge from `FrameworkSignal` when available.
- [x] Preserve heuristic fallback when framework signals are unavailable.
- [x] Separate generic rules from Playwright-specific rules through `RuleMapping`.
- [x] Add rule mapping and architecture validation notes.
- [x] Preserve existing Playwright benchmark output semantics.
- [x] Preserve existing CLI, GitHub Action, MCP, and VS Code Client behavior.
- [x] Keep benchmark suite and validation smoke green.

Architecture Freeze milestone before Sprint 13C:
- [x] Run one focused dependency and routing review before Selenium implementation starts.
- [x] Do not add new product features during this milestone.
- [x] Publish `docs/architecture-freeze-sprint-13.md`.

### ✅ Sprint 13C — Selenium WebDriver Adapter
- **Objective**: Integrate Selenium WebDriver for Node.js as the second framework adapter while preserving QA Cortex's generic rule model and Playwright output stability.
- **Status**: Completed.
- [x] Document architecture principles for framework-independent QA rules.
- [x] Detect Selenium WebDriver for Node.js projects.
- [x] Build Selenium locator, assertion, wait, lifecycle, and structure signals.
- [x] Add initial Selenium framework evidence and rule mapping seeds.
- [x] Add Selenium benchmark seed cases.
- [x] Preserve semantic equivalence for existing Playwright benchmark outputs.
- [x] Keep Playwright regression suite green.
- [x] Document Selenium support level as foundation with seed benchmarks.

### ✅ Sprint 13D — Selenium Calibration & Validation
- **Objective**: Calibrate and validate Selenium adapter and rules against real repositories.
- **Status**: Completed.
- [x] Select real Selenium WebDriver for Node.js repositories.
- [x] Run rule-only validation.
- [x] Triage false positives and false negatives.
- [x] Feed validated findings back into benchmarks.
- [x] Publish `validation/reports/selenium-calibration-report.md`.
- [x] Publish `validation/metrics/selenium-calibration-metrics.json`.
- [x] Produce GO / CONDITIONAL GO / NO-GO decision.

### ✅ Sprint 14 — Test Design Engine MVP (v3.0 Core)
- **Objective**: Identify missing test design scenarios with educational explanations, prioritize them, and generate boilerplate tests.
- **Status**: Completed.
- [x] Implement core `TestDesignEngine` and `TestDesignResult` structures.
- [x] Detect missing boundary value, equivalence partitioning, security, and data variation scenarios.
- [x] Add detailed QA scenario explanations to educate users.
- [x] Prioritize missing scenarios and generate Playwright & Selenium Node.js test templates.
- [x] Expose `generate_test_design` tool in the MCP Server for agent discovery.
- [x] Create test design benchmark specs and add verification integration tests.

### ✅ Sprint 15 — Framework-Neutral VS Code Client
- **Objective**: Transform the VS Code extension into a framework-neutral client powered by the QA Cortex core APIs.
- **Status**: Completed.
- [x] Implement core-driven framework detection in the extension.
- [x] Port Scanner.isTestFile() as the single source of truth for file eligibility.
- [x] Add frameworkOverride settings configuration.
- [x] Display detected framework dynamically in the VS Code Status Bar.
- [x] Gracefully fail on unsupported files (e.g. Python) without extension errors.

### ✅ Sprint 16 — VS Code Diagnostics & Squiggles
- **Objective**: Render inline diagnostics, CodeLenses, and status items inside VS Code.
- **Status**: Completed.
- [x] Draw error/warning squiggles in the editor and feed Problems panel.
- [x] Add CodeLenses for quick review execution on test files.
- [x] Add VS Code status bar item showing quality and audit states.
- [x] Register CodeActions (Quick Fixes) for Show Finding Details and Open Report.
- [x] Implement complete diagnostics lifecycle clearing on document close.
- [x] Add status bar attention configurations.

### ✅ Sprint 17 — Framework-Neutral VS Code Workspace UI (Phase 1)
- **Objective**: Surface QA Cortex intelligence through a responsive, native-themed workspace dashboard inside the VS Code Sidebar.
- **Status**: Completed.
- [x] Implement Sidebar Webview view container and registration.
- [x] Establish MVVM architecture with DashboardViewModel.
- [x] Build Review Tab with finding list, jump-to-line, and reveal-rule action commands.
- [x] Build Metrics Tab with quality/risk/maintainability scores and trend delta tracking.
- [x] Establish native VS Code styling and workspace state preservation.

### ✅ Sprint 18 — Advanced Workspace Workbench (Phase 2)
- **Objective**: Expand the Workspace UI with advanced analysis features, code templates workbench, and insights.
- **Status**: Completed.
- [x] Implement dynamic Design Tab workbench (running real TestDesignEngine).
- [x] Implement Coverage Tab displaying coverage stats by test design technique.
- [x] Implement Insights Tab showing workspace risks, top violated rules, and suggestions.
- [x] Add copy and editor insert workflow for generated test code templates.

### ✅ Sprint 19 — VS Code Marketplace Release & Hardening
- **Objective**: Configure packaging, set up opt-in telemetry, organize rule packs, and prepare RC packaging.
- **Status**: Completed and published to the VS Code Marketplace.
- [x] Added strict opt-in telemetry with `qaCortex.telemetryEnabled` defaulting to `false`.
- [x] Added anonymized local telemetry events for review, test design, crash, and feature usage.
- [x] Added versioned rule pack manifest at `knowledge/rule-pack.json`.
- [x] Added extension package asset preparation for compiled QA Cortex core and knowledge files.
- [x] Added `.vscodeignore` exclusions for source, tests, benchmarks, validation data, screenshots, and generated files.
- [x] Added extension marketplace metadata, package scripts, root license copy, changelog, versioning policy, and release checklist.
- [x] Generated local VSIX RC package and SHA256 checksum.
- [x] Publish extension Release Candidate (RC) to VS Code Marketplace after clean-profile smoke test and publisher token setup.
- [x] Published Marketplace listing: https://marketplace.visualstudio.com/items?itemName=qa-cortex.qa-cortex-vscode-client

### ✅ Sprint 19.5 — Core Hardening & Stability
- **Objective**: Address critical correctness and maintainability risks found during external project review before expanding to Python support.
- **Status**: Completed.
- [x] Fix MCP repository root detection so absolute file paths resolve their nearest project root instead of assuming server `cwd`.
- [x] Add LLM response schema validation and normalization before scoring/reporting.
- [x] Extract shared assertion detection helpers used by adapters and deterministic fallback.
- [x] Define deterministic finding deduplication severity merge behavior.
- [x] Remove or isolate benchmark-overfit string heuristics from scoring and signal extraction.
- [x] Clean mixed-language/encoding leftovers in user-facing CLI/MCP messages.
- [x] Add regression tests for MCP root detection, invalid LLM JSON shape, assertion helper parity, and dedup severity behavior.
- [x] Keep existing benchmark, validation, VS Code compile, and VSIX packaging checks green.
- [x] Created Mimari Karar Günlüğü (Architecture Decisions Log) under `docs/architecture-decisions.md`.

### ✅ Sprint 20 — Python Core & Scanner (v4.0 Core)
- **Objective**: Generalize scanning engine to parse Python test folders and package structures.
- **Status**: Completed.
- [x] Generalize test file scanner to detect python files (`.py`) and match pytest/unittest naming standards (`test_*.py`, `*_test.py`).
- [x] Implement `requirements.txt` parser inside `ContextBuilder` to map Python project dependencies.
- [x] Support python class and method regex matches in `mapPageObjects` and `mapFixtures` (including `conftest.py`).
- [x] Integrate python-specific selenium/playwright import detection in `detectFramework`.
- [x] Add regression test coverage for python scanner features.

### ✅ Sprint 21 — Kalite ve Test Altyapısı Güçlendirme (Hardening)
- **Objective**: Migrate the testing framework to Vitest, establish automated CI, and transition ScoringEngine to structured findings.
- **Status**: Completed.
- [x] Migrated integration test suite from ad-hoc ts-node runner to Vitest, reducing runtimes to < 20ms.
- [x] Configured `vitest.config.ts` to isolate execution of spec fixtures from unit/integration tests.
- [x] Established automated GitHub Actions CI workflow in `.github/workflows/ci.yml`.
- [x] Refactored `ScoringEngine` checks to evaluate structural `FindingCategory` and `ruleId` fields, removing brittle substring matching.
- [x] Enhanced BVA detection heuristic using regex parsing of test titles and statements.

### ✅ Sprint 22 — Temizlik ve Genelleştirme (Generalization & Cleanup)
- **Objective**: Clean misleading mock test directories, resolve calibration overfitting, and refine file scanner patterns.
- **Status**: Completed.
- [x] Renamed and moved mock configuration/test specs under `tests/repository-analysis/` to `tests/fixtures/repository-analysis/` as `.fixture.ts`.
- [x] Generalised path checking rules inside `KnowledgeRouter` and `GeminiProvider` to remove hardcoded validation repo references.
- [x] Updated `Scanner.ts` isTestFile regex to eliminate false positive matching of library source files (e.g., `test-case.ts`).
- [x] Updated `README.md` to accurately define Rule Engine vs LLM performance characteristics.

### ✅ Sprint 23 — Python Adapter & Calibration
- **Objective**: Build Python Selenium adapter, calibrate on open-source Python repos, and activate Python review/scoring in CLI and VS Code.
- **Status**: Completed.
- [x] Created `PythonSeleniumAdapter` with 4 local deterministic rules (time.sleep, By.XPATH, missing quit, missing assert).
- [x] Implemented file extension-based framework isolation to prevent JS/TS adapters from claiming Python files.
- [x] Updated `GeminiProvider` test design prompts to generate pytest + Selenium templates for `.py` files.
- [x] Enabled single-file review CLI validation for Python files and verified 9/9 Vitest unit tests pass.
- [x] Calibrated Python Selenium rules on real-world repositories (e.g. `python-selenium-framework-example`), successfully flagging real test smells.

---

### Sprint 24 - Benchmark Expansion & Publish Readiness
- **Objective**: Expand deterministic calibration coverage before the next publish cycle.
- **Status**: Completed.
- [x] Expanded benchmark suite from 12 to 40 cases.
- [x] Added Playwright coverage for generated IDs, nth-child chains, clean locators, multiple hard waits, proper waits, missing assertions, weak assertions, strong assertions, global state, beforeAll state leaks, inline selector clusters, hardcoded test data, and ambiguous test names.
- [x] Added Selenium WebDriver for Node.js coverage for CSS chains, implicit waits, weak assertions, missing teardown, and shared driver state.
- [x] Added Python Selenium benchmark coverage for locator, wait, assertion, cleanup, and mixed-smell scenarios.
- [x] Added negative benchmark cases to verify clean examples do not produce false positives.
- [x] Updated BenchmarkRunner to support explicit spec paths and Python benchmark files.
- [x] Verified `npm run build`, `npm test`, and `node dist/src/cli.js benchmark` with 40/40 passing.

## Future Roadmap

### ⬜ v1.0.0 — Production Release Gates
- **Objective**: Deliver configurable quality gates, SARIF export, and baseline comparison features.
- **Status**: Planned.
