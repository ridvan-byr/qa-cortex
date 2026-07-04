# QA Brain Sprint 11 Final Validation Report

Generated: 2026-07-04

## Summary

Sprint 11 validated QA Brain against real open-source Playwright repositories and calibrated noisy rule behavior using manual triage.

| Metric | Result |
| :--- | :--- |
| Repositories configured | 10 |
| Active repositories with Playwright specs | 10 |
| Files reviewed | 229 |
| Final active findings | 2 |
| Clear false positives after manual triage | 0 |
| Benchmark tests | 7 |
| Benchmark result | 7/7 passed |
| Regression | None |
| Average validation review time | 1ms |
| LLM provider comparison | Deferred |

## Calibration Progression

| Stage | Findings |
| :--- | ---: |
| Initial real repository validation | 59 |
| First calibration | 26 |
| Second calibration | 5 |
| After manual triage actions | 2 |

Sprint 11 reduced noisy findings while preserving real signals. The final 2 active findings are both manually classified as true positives.

## Repository Set

`ixartz/Next-js-Boilerplate` was replaced because it did not contain active Playwright specs in the validation scan.

Replacement:

| Repository | Reason |
| :--- | :--- |
| `microsoft/playwright-mcp` | Small Playwright tooling repository with real Playwright specs |

Final repository selection criteria are satisfied.

## Final Active Findings

| Finding | Repository | File | Manual Classification |
| :--- | :--- | :--- | :--- |
| F1 | `synpress-io/synpress` | `wallets/metamask/test/playwright/e2e/resetAccount.spec.ts` | True Positive |
| F2 | `akshayp7/playwright-typescript-playwright-test` | `tests/db/DB.test.ts` | True Positive |

Both findings represent tests that perform meaningful work without asserting the expected result.

## Benchmarks Added

| ID | Scenario |
| :--- | :--- |
| `ASSERTION_001` | Fixture-heavy reset flow without final state assertion |
| `ASSERTION_002` | Database/API-adjacent query without result assertion |

These benchmarks preserve the real-world learning from Sprint 11 as regression coverage.

## Accuracy Interpretation

Do not report `2 / 5` as overall QA Brain precision. It only described the strict classification of the last 5 ambiguous findings.

Sprint 11 accuracy conclusion:

- Final active findings: 2
- Manual true positives: 2
- Clear false positives in final triage set: 0
- Demo/example signals were downgraded out of active findings
- Benchmark regression: none

## Sprint 11 Deliverables

Sprint 11 produced more than a single validation run. It established a reusable validation process for future releases.

| Deliverable | Status |
| :--- | :--- |
| Validation Engine | Completed |
| Golden Repositories | Completed |
| Rule Calibration | Completed |
| Manual Triage Process | Completed |
| Benchmark Feedback Loop | Completed |
| Real Repository Dataset | Completed |

## LLM Provider Comparison

Status: Deferred.

Provider comparison is not blocking Sprint 11 closure. The deterministic Rule Only engine was the primary target of this sprint.

Future provider comparison candidates:

| Provider | Status |
| :--- | :--- |
| OpenAI | Deferred |
| Gemini | Deferred due quota |
| Claude | Deferred |

## Go / No-Go

Recommendation: Go for v0.9 RC.

Rationale:

- Real repository validation infrastructure is in place.
- Repository selection criteria are satisfied.
- No clear false positives remain in final manual triage.
- Real true-positive findings were converted into benchmarks.
- Benchmark suite passes with no regression.

Recommended release path:

```text
Sprint 11
  -> v0.9 RC
  -> 2-3 weeks real project usage
  -> Bug fixes
  -> v1.0 Playwright Stable
  -> Selenium Full Support track
```

## Lessons Learned

- Demo/example repositories require context-aware severity calibration.
- Missing Assertion detection should evolve from file-level to test-level reasoning.
- Real repository validation produced better benchmark cases than synthetic examples alone.
- Manual triage proved essential for calibrating noisy rules before release.
- Provider comparison is useful, but deterministic validation must be trustworthy on its own.

## Deferred Follow-Up

- Run LLM provider comparison after OpenAI/Gemini/Claude API usage is available.
- Add per-test-block assertion analysis so one file can contain both asserted and assertion-free tests.
- Use v0.9 RC in real projects for 2-3 weeks before v1.0.
