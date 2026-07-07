# Changelog

## 1.0.0

- Expanded the benchmark suite from 12 to 40 deterministic calibration cases across Playwright, Selenium WebDriver for Node.js, and Python Selenium.
- Added negative benchmark cases for clean locators, proper waits, strong assertions, and proper Python Selenium teardown to guard against false positives.
- Added Python Selenium benchmark coverage for XPath/CSS locators, time.sleep, missing assertions, missing driver quit, proper teardown, and mixed smell scenarios.
- Calibrated deterministic rules for generated ID locators, inline selector clusters, weak assertions, ambiguous test names, hardcoded test data, Selenium implicit waits, Selenium shared drivers, and Python Selenium CSS selector chains.
- Updated BenchmarkRunner to support explicit spec paths and Python benchmark files in ground-truth JSON entries.
- Added **Quality Gates** CLI integration with `--fail-under <score>` flag, terminating the process with exit code 1 if the quality score drops below the threshold.
- Added **SARIF Report Format Exporter** (`--format sarif` flag) to output standard Static Analysis Results Interchange Format (SARIF v2.1.0) for CI/CD integrations.
- Modernized the **VS Code Sidebar Webview UI** with Outfit & Inter typography, progress bars with HSL gradients, and hover transitions.
- Integrated **AI Editor Rules Integration** card under the settings panel in VS Code to export project guidelines to Cursor, Windsurf, Copilot, and Antigravity.
- Added **Python Selenium Adapter** support for pytest framework, including 4 deterministic rule engines (XPath locators, hardcoded waits, missing driver teardowns, and missing assertion statements).
- Implemented file extension-based framework filtering to prevent Node.js Playwright/Selenium adapters from claiming Python files.
- Integrated Python support into `cli.ts` review execution, enabling direct CLI audits for `.py` test files.
- Updated `GeminiProvider` test design prompts to dynamically output Python/pytest code templates for `.py` specs.
- Removed VS Code extension checks blocking `.py` files, enabling both "Review" and "Test Design" sidebar tab features for Python.
- Configured real open-source Python Selenium repository calibration in the validation suite, confirming zero-false-positive detection on real-world test suites.

## 0.1.0

- First official release of **QA Cortex** after the full product rename.
- Completed the QA Cortex brand migration across product text, package metadata, command names, configuration keys, reports, docs, and release metadata.
- Updated VS Code extension display name, dashboard text, commands, notifications, status bar, diagnostics, and output channel to use QA Cortex.
- Migrated integration test suite to **Vitest**, reducing test execution times to < 20ms and adding `vitest.config.ts` isolation.
- Created automated **GitHub Actions CI workflow** (`.github/workflows/ci.yml`) using Node 22 and kilitli npm dependency caching.
- Hardened `ScoringEngine` scoring formulas by migrating from fragile free-text substring matches to structured `FindingCategory` and `ruleId` fields.
- Refined `Scanner.ts` file detection regex to eliminate false-positive scans on non-test source files (e.g., `test-case.ts`).
- Generalized path calibration filters in `KnowledgeRouter` and `GeminiProvider` to remove repository-specific exceptions.
- Added Python test file scanner to scan `test_*.py`, `*_test.py`, and `test.py` files.
- Added `requirements.txt` parsing support to map Python dependencies like `pytest`, `selenium`, and `playwright`.
- Merged `package.json` and `requirements.txt` dependency discovery for mixed Node.js + Python repositories.
- Added Python Page Object Model (POM) parsing matching Python classes and async/sync methods.
- Added Python pytest fixture parsing matching `conftest.py` setup files.
- Added Python Selenium and Playwright framework detection based on library imports.
- Standalone `LLMNormalizer` to validate and sanitize raw provider JSON outputs.
- Dynamic project root resolution via `findNearestProjectRoot` in MCP tools to support nested monorepos.
- Deterministic ordering (Line -> Title) and severity merging for deduplicated findings.
- Direct LLM configuration UI in the VS Code sidebar dashboard supporting Gemini, OpenAI, Anthropic, and OpenRouter.
