# QA Cortex

QA Cortex is a Quality Engineering assistant for VS Code. It reviews Playwright and Selenium WebDriver test files, highlights risky automation patterns, suggests missing test scenarios, and presents results in a native VS Code dashboard.

The extension uses the local QA Cortex rule engine by default. LLM providers are optional and can be configured from the dashboard.

## Features

- Review current test file or selected code.
- Show findings in the Problems panel with editor diagnostics.
- Display CodeLens summaries for reviewed test files.
- Generate structured Markdown reports.
- Run test design analysis for missing scenarios.
- Show quality, risk, maintainability, coverage, and insight tabs in the sidebar dashboard.
- Configure Gemini, OpenAI, Anthropic, or OpenRouter as optional provider fallbacks.

## How To Use

1. Install the extension.
2. Open the QA Cortex view from the Activity Bar.
3. Open a supported test file.
4. Run `QA Cortex: Review Current Test File` from the Command Palette or editor context menu.
5. Inspect findings in the Problems panel, Output channel, and QA Cortex dashboard.

You can also select a code block and run `QA Cortex: Review Selection` for a context-limited review.

## Configuration

The extension keeps the existing `qaBrain.*` setting keys for compatibility.

Common settings:

- `qaBrain.reviewOnSave`: run review when a supported test file is saved.
- `qaBrain.showDiagnostics`: show findings in the Problems panel.
- `qaBrain.showCodeLens`: show CodeLens summaries on supported test files.
- `qaBrain.showStatusBar`: show the QA Cortex status bar item.
- `qaBrain.telemetryEnabled`: opt in to local anonymized telemetry. Disabled by default.
- `qaBrain.apiProvider`: optional provider fallback, such as Gemini, OpenAI, Anthropic, or OpenRouter.
- `qaBrain.apiKey`: API key for the selected optional provider.

## Privacy

Telemetry is disabled by default. When enabled, telemetry is local and anonymized. QA Cortex does not record file paths, repository URLs, source code, API keys, or secrets.

## Compatibility Note

QA Cortex was previously developed under the QA Brain name. Some internal identifiers, command IDs, and package names may still use `qa-brain` or `qaBrain` for compatibility.

## License

MIT
