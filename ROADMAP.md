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

---

## Future Roadmap

### ⬜ Sprint 7 — Calibration & Benchmark Suite
- **Objective**: Establish evaluation/ benchmarks dataset and calculate Precision, Recall, and False Positives to calibrate AI review quality to Senior QA levels.

### ⬜ Sprint 8 — CLI
- **Objective**: Develop a command-line interface supporting `qa-brain review .` for local terminal-based analysis.

### ⬜ Sprint 9 — GitHub Action
- **Objective**: Integrate with CI/CD to scan PR diffs and post structured markdown review comments directly to GitHub PRs.

### ⬜ Sprint 10 — MCP Server
- **Objective**: Implement Model Context Protocol (MCP) to provide native integrations for Claude Desktop, VS Code, Cursor, and Antigravity.

### ⬜ v1.0 — Stable Release
- **Objective**: Reach production stability and expand rule sets to support multiple frameworks (Cypress, Selenium).
