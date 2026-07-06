# QA Cortex Architecture Principles

This document records the architectural rules that guide QA Cortex as it evolves from a Playwright reviewer into a framework-independent Quality Engineering platform.

## Core Model

```text
QA Principles
  -> Review Rules
  -> Framework Evidence
  -> Recommendations
```

QA Cortex should not treat framework APIs as the source of quality knowledge. Framework APIs provide evidence for review rules; the QA principle remains framework-independent whenever possible.

## Principles

### 1. QA Principles Are Framework-Independent

The same QA problem should be represented by the same review principle across frameworks.

Examples:

- Brittle locators reduce maintainability.
- Missing assertions reduce test value.
- Resource cleanup prevents leaks and flaky execution.
- Page Objects improve maintainability when used intentionally.

### 2. Adapters Provide Evidence, Not Recommendations

Framework adapters should produce signals and evidence.

They should not own final recommendations.

```text
Rule
  -> Evidence
  -> Recommendation Template
```

For example, Playwright and Selenium may provide different evidence for a brittle locator, but the recommendation should remain conceptually consistent.

### 3. Rules Consume Signals, Not Framework APIs

The rule engine should consume `FrameworkSignal` values.

It should not need to know whether the source API was:

- `page.locator(...)`
- `driver.findElement(...)`
- `cy.get(...)`

### 4. Framework-Specific Logic Stays Inside Adapters

Framework-specific parsing, detection, and signal generation should live inside framework adapters or framework profile helpers.

The router and scoring layers should not accumulate framework-specific API checks.

### 5. Observable Behavior Must Remain Stable Across Refactors

Architecture work must preserve existing user-facing behavior unless a change is intentional and documented.

For benchmark cases, semantic equivalence matters more than byte-for-byte equality:

- Same finding
- Same severity
- Same score class
- Same recommendation intent

### 6. New Framework Support Requires Validation Before Stable Labeling

A framework should not be marked as stable until it has:

- Detection
- Adapter
- Signals
- Rule mapping
- Benchmarks
- Real repository validation
- False positive / false negative calibration
- Documentation

## Supported Framework Labels

- Stable: validated with benchmarks and real repositories.
- Foundation: adapter and seed benchmarks exist, but real repository calibration is not complete.
- Planned: roadmap target with no implementation guarantee yet.

## Current Target State

```text
Playwright
  -> Stable

Selenium WebDriver for Node.js
  -> Foundation target in Sprint 13C

Selenium Python / Java / C#
  -> Planned
```
