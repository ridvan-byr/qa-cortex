import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import type { DashboardViewModel, DashboardState } from './dashboardViewModel';

export class QaBrainSidebarViewProvider implements vscode.WebviewViewProvider {
  private view?: vscode.WebviewView;
  private readonly repoRoot: string;

  constructor(
    private readonly context: vscode.ExtensionContext,
    private readonly viewModel: DashboardViewModel
  ) {
    this.repoRoot = path.resolve(__dirname, '../../../..');
  }

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: any,
    token: vscode.CancellationToken
  ): void {
    this.view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [vscode.Uri.file(path.join(this.repoRoot, 'knowledge'))]
    };

    webviewView.webview.html = this.getHtmlContent();

    // Listen to messages from the Webview
    webviewView.webview.onDidReceiveMessage(async (message) => {
      switch (message.command) {
        case 'jumpToLine': {
          const editor = vscode.window.activeTextEditor;
          if (editor) {
            const line = this.findEvidenceLine(editor.document, message.evidence);
            const range = new vscode.Range(new vscode.Position(line, 0), new vscode.Position(line, 0));
            editor.selection = new vscode.Selection(range.start, range.start);
            editor.revealRange(range, 1); // 1 = InCenter
          }
          break;
        }

        case 'revealRule': {
          const rule: string = message.rule;
          const parts = rule.split('#');
          const ruleFile = parts[0];
          const anchor = parts[1];

          let rulePath = path.join(this.repoRoot, 'knowledge', ruleFile);
          if (!fs.existsSync(rulePath)) {
            const potentialFile = this.searchFile(path.join(this.repoRoot, 'knowledge'), ruleFile);
            if (potentialFile) rulePath = potentialFile;
          }

          if (fs.existsSync(rulePath)) {
            const doc = await vscode.workspace.openTextDocument(vscode.Uri.file(rulePath));
            const sideEditor = await vscode.window.showTextDocument(doc, {
              viewColumn: vscode.ViewColumn.Beside,
              preview: true
            });

            if (anchor) {
              const text = doc.getText();
              const index = text.indexOf(anchor);
              if (index !== -1) {
                const pos = doc.positionAt(index);
                const range = new vscode.Range(pos, pos);
                sideEditor.selection = new vscode.Selection(pos, pos);
                sideEditor.revealRange(range, 1);
              }
            }
          } else {
            vscode.window.showWarningMessage(`QA Brain: Knowledge rule document not found: ${ruleFile}`);
          }
          break;
        }

        case 'copyTemplate':
          await vscode.env.clipboard.writeText(message.code);
          vscode.window.showInformationMessage('QA Brain: Test template copied to clipboard.');
          break;

        case 'insertTemplate': {
          const editor = vscode.window.activeTextEditor;
          if (editor) {
            editor.edit(editBuilder => {
              editBuilder.insert(editor.selection.active, message.code);
            });
            vscode.window.showInformationMessage('QA Brain: Test template inserted (Experimental).');
          } else {
            vscode.window.showWarningMessage('QA Brain: No active text editor open to insert template.');
          }
          break;
        }

        case 'runReview':
          vscode.commands.executeCommand('qaBrain.reviewCurrentFile');
          break;

        case 'runDesign':
          vscode.commands.executeCommand('qaBrain.runTestDesign');
          break;

        case 'ready':
          this.pushState();
          break;
      }
    });

    this.viewModel.registerOnStateChanged((state) => {
      this.updateWebview(state);
    });
  }

  private pushState(): void {
    const state = this.viewModel.getCurrentState();
    if (state) {
      this.updateWebview(state);
    }
  }

  private updateWebview(state: DashboardState): void {
    if (this.view) {
      this.view.webview.postMessage({ type: 'update', state });
    }
  }

  private findEvidenceLine(document: vscode.TextDocument, evidence: string): number {
    const needle = evidence.trim();
    if (!needle) return 0;

    for (let line = 0; line < document.lineCount; line++) {
      if (document.lineAt(line).text.includes(needle)) {
        return line;
      }
    }
    return 0;
  }

  private searchFile(dir: string, fileName: string): string | undefined {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        const found = this.searchFile(fullPath, fileName);
        if (found) return found;
      } else if (item.name === fileName) {
        return fullPath;
      }
    }
    return undefined;
  }

  private getHtmlContent(): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>QA Brain Dashboard</title>
  <style>
    body {
      background-color: var(--vscode-sideBar-background);
      color: var(--vscode-sideBar-foreground);
      font-family: var(--vscode-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif);
      font-size: var(--vscode-font-size, 13px);
      margin: 0;
      padding: 12px;
      box-sizing: border-box;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
    .title {
      font-size: 1.2em;
      font-weight: bold;
    }
    .framework-badge {
      font-size: 0.85em;
      background-color: var(--vscode-badge-background);
      color: var(--vscode-badge-foreground);
      padding: 2px 6px;
      border-radius: 3px;
    }
    .tabs {
      display: flex;
      flex-wrap: wrap;
      border-bottom: 1px solid var(--vscode-panel-border);
      margin-bottom: 16px;
      gap: 2px;
    }
    .tab {
      padding: 6px 10px;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      color: var(--vscode-tab-inactiveForeground);
      font-weight: 500;
      font-size: 0.95em;
    }
    .tab.active {
      border-bottom-color: var(--vscode-button-background);
      color: var(--vscode-tab-activeForeground);
      font-weight: bold;
    }
    .tab-content {
      display: none;
    }
    .tab-content.active {
      display: block;
    }
    .no-review {
      text-align: center;
      padding: 30px 15px;
      opacity: 0.8;
    }
    .card {
      background-color: var(--vscode-editor-background);
      border: 1px solid var(--vscode-panel-border);
      border-radius: 4px;
      padding: 10px;
      margin-bottom: 10px;
      box-sizing: border-box;
    }
    .card.clickable {
      cursor: pointer;
    }
    .card.clickable:hover {
      border-color: var(--vscode-focusBorder);
    }
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      font-weight: bold;
      margin-bottom: 6px;
      gap: 6px;
    }
    .card-title {
      font-size: 1.05em;
    }
    .severity-badge {
      font-size: 0.8em;
      padding: 1px 4px;
      border-radius: 2px;
      white-space: nowrap;
    }
    .severity-badge.critical, .severity-badge.high, .severity-badge.high-crit {
      background-color: var(--vscode-testing-iconFailedColor, #a1260d);
      color: #fff;
    }
    .severity-badge.medium {
      background-color: var(--vscode-testing-iconQueuedColor, #cca700);
      color: #000;
    }
    .severity-badge.low {
      background-color: var(--vscode-testing-iconPassedColor, #388a34);
      color: #fff;
    }
    .card-meta {
      font-size: 0.85em;
      opacity: 0.8;
      margin-bottom: 6px;
    }
    .card-rec {
      font-size: 0.9em;
      margin-bottom: 8px;
    }
    .card-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 6px;
    }
    .btn {
      background-color: var(--vscode-button-background);
      color: var(--vscode-button-foreground);
      border: none;
      padding: 4px 8px;
      cursor: pointer;
      border-radius: 2px;
      font-size: 0.85em;
    }
    .btn:hover {
      background-color: var(--vscode-button-hoverBackground);
    }
    .btn.secondary {
      background-color: var(--vscode-button-secondaryBackground, #3a3d41);
      color: var(--vscode-button-secondaryForeground, #ffffff);
    }
    .btn.secondary:hover {
      background-color: var(--vscode-button-secondaryHoverBackground, #45494e);
    }
    .metric-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px dashed var(--vscode-panel-border);
    }
    .metric-name {
      font-weight: 500;
    }
    .metric-value {
      font-weight: bold;
      display: flex;
      gap: 6px;
      align-items: center;
    }
    .trend {
      font-size: 0.9em;
      font-weight: normal;
    }
    .trend.up {
      color: #388a34;
    }
    .trend.down {
      color: #a1260d;
    }
    .trend.neutral {
      opacity: 0.5;
    }
    .template-box {
      background-color: var(--vscode-textCodeBlock-background, #1e1e1e);
      border: 1px solid var(--vscode-panel-border);
      border-radius: 3px;
      padding: 6px;
      margin-top: 6px;
      font-family: var(--vscode-editor-font-family, monospace);
      font-size: 0.85em;
      overflow-x: auto;
      white-space: pre;
    }
    .list-heading {
      font-weight: bold;
      margin-top: 15px;
      margin-bottom: 6px;
      font-size: 1.05em;
      border-bottom: 1px solid var(--vscode-panel-border);
      padding-bottom: 4px;
    }
    .insight-item {
      padding: 6px 0;
      border-bottom: 1px solid var(--vscode-panel-border);
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="title">🧠 QA Brain Dashboard</div>
    <div id="framework-badge" class="framework-badge" style="display: none;">Unknown</div>
  </div>

  <div class="tabs">
    <div id="tab-review" class="tab active" onclick="switchTab('review')">Review</div>
    <div id="tab-design" class="tab" onclick="switchTab('design')">Design</div>
    <div id="tab-coverage" class="tab" onclick="switchTab('coverage')">Coverage</div>
    <div id="tab-metrics" class="tab" onclick="switchTab('metrics')">Metrics</div>
    <div id="tab-insights" class="tab" onclick="switchTab('insights')">Insights</div>
  </div>

  <!-- Review Tab -->
  <div id="content-review" class="tab-content active">
    <div id="review-list">
      <div class="no-review">
        <p>No active file review. Open a test file and click below to review.</p>
        <button class="btn" onclick="runReview()">Run QA Brain Review</button>
      </div>
    </div>
  </div>

  <!-- Design Tab -->
  <div id="content-design" class="tab-content">
    <div id="design-list">
      <div class="no-review">
        <p>Run test design to analyze missing scenarios and generate code.</p>
        <button class="btn" onclick="runDesign()">Run Test Design Analysis</button>
      </div>
    </div>
  </div>

  <!-- Coverage Tab -->
  <div id="content-coverage" class="tab-content">
    <div id="coverage-view">
      <div class="no-review">
        <p>Run review or test design first to inspect test design coverage.</p>
      </div>
    </div>
  </div>

  <!-- Metrics Tab -->
  <div id="content-metrics" class="tab-content">
    <div id="metrics-view">
      <div class="no-review">
        <p>Run review first to view quality trends and scores.</p>
      </div>
    </div>
  </div>

  <!-- Insights Tab -->
  <div id="content-insights" class="tab-content">
    <div id="insights-view">
      <div class="no-review">
        <p>Gathering workspace risk metrics and rules count...</p>
      </div>
    </div>
  </div>

  <script>
    const vscode = acquireVsCodeApi();

    // Signal ready to load state
    vscode.postMessage({ command: 'ready' });

    window.addEventListener('message', event => {
      const message = event.data;
      if (message.type === 'update') {
        renderState(message.state);
      }
    });

    function switchTab(tabId) {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      document.getElementById('tab-' + tabId).classList.add('active');
      document.getElementById('content-' + tabId).classList.add('active');
    }

    function runReview() {
      vscode.postMessage({ command: 'runReview' });
    }

    function runDesign() {
      vscode.postMessage({ command: 'runDesign' });
    }

    function jumpToLine(evidence) {
      vscode.postMessage({ command: 'jumpToLine', evidence });
    }

    function revealRule(rule) {
      vscode.postMessage({ command: 'revealRule', rule });
    }

    function copyTemplate(code) {
      vscode.postMessage({ command: 'copyTemplate', code });
    }

    function insertTemplate(code) {
      vscode.postMessage({ command: 'insertTemplate', code });
    }

    function toggleElement(id) {
      const el = document.getElementById(id);
      if (el.style.display === 'none' || !el.style.display) {
        el.style.display = 'block';
      } else {
        el.style.display = 'none';
      }
    }

    function renderState(state) {
      const fwBadge = document.getElementById('framework-badge');
      if (state.hasReview && state.framework) {
        fwBadge.textContent = state.framework;
        fwBadge.style.display = 'block';
      } else {
        fwBadge.style.display = 'none';
      }

      // 1. Render Review Tab
      const reviewList = document.getElementById('review-list');
      if (!state.hasReview) {
        reviewList.innerHTML = \`<div class="no-review">
          <p>No active file review. Open a test file and click below to review.</p>
          <button class="btn" onclick="runReview()">Run QA Brain Review</button>
        </div>\`;
        
        document.getElementById('design-list').innerHTML = \`<div class="no-review">
          <p>Run test design to analyze missing scenarios and generate code.</p>
          <button class="btn" onclick="runDesign()">Run Test Design Analysis</button>
        </div>\`;

        document.getElementById('coverage-view').innerHTML = \`<div class="no-review">
          <p>Run review or test design first to inspect test design coverage.</p>
        </div>\`;

        document.getElementById('metrics-view').innerHTML = \`<div class="no-review">
          <p>Run review first to view quality trends and scores.</p>
        </div>\`;
        return;
      }

      if (state.findings.length === 0) {
        reviewList.innerHTML = \`<div class="no-review">
          <p>🎉 Excellent! No code quality issues found in this file.</p>
          <button class="btn" onclick="runReview()">Review Again</button>
        </div>\`;
      } else {
        let html = '';
        state.findings.forEach(f => {
          const sevClass = f.severity.toLowerCase();
          
          let ruleRef = '';
          const title = f.title.toLowerCase();
          if (title.includes('locator') || title.includes('selector')) ruleRef = 'locator-review.md';
          else if (title.includes('timeout') || title.includes('sleep')) ruleRef = 'waiting-review.md';
          else if (title.includes('isolation') || title.includes('shared state')) ruleRef = 'isolation-review.md';
          else if (title.includes('assertion')) ruleRef = 'assertion-review.md';
          else if (title.includes('cleanup') || title.includes('driver')) ruleRef = 'resource-cleanup-review.md';
          
          let actionButtons = '';
          if (ruleRef) {
            actionButtons = \`<button class="btn secondary" onclick="event.stopPropagation(); revealRule('\${ruleRef}')">Reveal Rule</button>\`;
          }

          html += \`<div class="card clickable" onclick="jumpToLine('\${f.evidence.replace(/'/g, "\\\\'")}')">
            <div class="card-header">
              <span class="card-title">\${f.title}</span>
              <span class="severity-badge \${sevClass}">\${f.severity}</span>
            </div>
            <div class="card-meta">Evidence: <code>\${escapeHtml(f.evidence)}</code></div>
            <div class="card-rec">\${f.recommendation}</div>
            <div class="card-actions">
              \${actionButtons}
            </div>
          </div>\`;
        });
        reviewList.innerHTML = html;
      }

      // 2. Render Design Tab
      const designList = document.getElementById('design-list');
      if (!state.testDesign) {
        designList.innerHTML = \`<div class="no-review">
          <p>Run test design to analyze missing scenarios and generate code templates.</p>
          <button class="btn" onclick="runDesign()">Run Test Design Analysis</button>
        </div>\`;
      } else if (!state.testDesign.missingScenarios || state.testDesign.missingScenarios.length === 0) {
        designList.innerHTML = \`<div class="no-review">
          <p>🎉 All expected test design scenarios (ISTQB ECP/BVA) are already covered! No missing scenarios detected.</p>
          <button class="btn" onclick="runDesign()">Run Design Again</button>
        </div>\`;
      } else {
        let html = '';
        state.testDesign.missingScenarios.forEach((s, idx) => {
          const critClass = s.criticality.toLowerCase() === 'high' ? 'high-crit' : s.criticality.toLowerCase();
          const targetCode = state.framework === 'Selenium' ? s.suggestedTemplate.selenium : s.suggestedTemplate.playwright;
          const escCode = escapeHtml(targetCode);

          html += \`<div class="card">
            <div class="card-header">
              <span class="card-title">\${s.title}</span>
              <span class="severity-badge \${critClass}">\${s.criticality}</span>
            </div>
            <div class="card-meta">Category: <strong>\${s.category}</strong></div>
            <div class="card-rec">\${s.description}</div>
            <div style="font-size: 0.9em; font-style: italic; opacity: 0.95; margin-bottom: 6px;">\${s.explanation}</div>
            <div class="card-actions">
              <button class="btn" onclick="toggleElement('tpl-\${idx}')">Toggle Code Template</button>
              <button class="btn secondary" onclick="copyTemplate('\${targetCode.replace(/\\\\/g, '\\\\\\\\').replace(/'/g, "\\\\'").replace(/\\n/g, '\\\\n')}')">Copy Template</button>
              <button class="btn secondary" onclick="insertTemplate('\${targetCode.replace(/\\\\/g, '\\\\\\\\').replace(/'/g, "\\\\'").replace(/\\n/g, '\\\\n')}')">Insert (Experimental)</button>
            </div>
            <div id="tpl-\${idx}" class="template-box" style="display: none;">\${escCode}</div>
          </div>\`;
        });
        designList.innerHTML = html;
      }

      // 3. Render Coverage Tab (Test Design Coverage)
      const coverageView = document.getElementById('coverage-view');
      const covScore = state.testDesign ? state.testDesign.coverageScore : 100;
      let covHtml = \`<div style="font-size: 1.1em; font-weight: bold; margin-bottom: 12px;">Test Design Coverage Score: \${covScore}%</div>\`;

      if (state.testDesignCoverage && state.testDesignCoverage.length > 0) {
        covHtml += \`<div class="list-heading">Technique Breakdown</div>\`;
        state.testDesignCoverage.forEach(c => {
          const statusText = c.covered ? '✅ Covered' : '⚠️ Missing (' + c.missingCount + ')';
          covHtml += \`<div class="metric-row">
            <span class="metric-name">\${c.category}</span>
            <span class="metric-value">\${statusText}</span>
          </div>\`;
        });
      } else {
        covHtml += \`<div class="no-review"><p>Run Test Design Analysis to inspect breakdown metrics.</p></div>\`;
      }
      coverageView.innerHTML = covHtml;

      // 4. Render Metrics Tab
      const metricsView = document.getElementById('metrics-view');
      metricsView.innerHTML = \`
        <div class="metric-row">
          <span class="metric-name">Quality Score</span>
          <span class="metric-value">
            \${state.qualityScore}
            \${renderDelta(state.qualityDelta, true)}
          </span>
        </div>
        <div class="metric-row">
          <span class="metric-name">Risk Score</span>
          <span class="metric-value">
            \${state.riskScore}
            \${renderDelta(state.riskDelta, false)}
          </span>
        </div>
        <div class="metric-row">
          <span class="metric-name">Maintainability</span>
          <span class="metric-value">
            \${state.maintainabilityScore}
            \${renderDelta(state.maintainabilityDelta, true)}
          </span>
        </div>
      \`;

      // 5. Render Insights Tab
      const insightsView = document.getElementById('insights-view');
      let insightsHtml = '';

      if (state.insights) {
        // Render Suggestions
        insightsHtml += \`<div class="list-heading">Recommendations</div>\`;
        state.insights.suggestions.forEach(s => {
          insightsHtml += \`<div class="insight-item">\${s}</div>\`;
        });

        // Render Risky Modules
        insightsHtml += \`<div class="list-heading">Risky Modules</div>\`;
        if (state.insights.riskyFiles.length === 0) {
          insightsHtml += \`<div class="no-review"><p>No risky files calculated. Review files to update.</p></div>\`;
        } else {
          state.insights.riskyFiles.forEach(f => {
            insightsHtml += \`<div class="metric-row">
              <span class="metric-name">\${f.filePath}</span>
              <span class="metric-value">Risk: \${f.risk}</span>
            </div>\`;
          });
        }

        // Render Top Violations
        insightsHtml += \`<div class="list-heading">Top Violations</div>\`;
        if (state.insights.violatedRules.length === 0) {
          insightsHtml += \`<div class="no-review"><p>No rule violations recorded.</p></div>\`;
        } else {
          state.insights.violatedRules.forEach(r => {
            insightsHtml += \`<div class="metric-row">
              <span class="metric-name">\${r.ruleId}</span>
              <span class="metric-value">Count: \${r.count}</span>
            </div>\`;
          });
        }
      } else {
        insightsHtml = \`<div class="no-review"><p>Run review first to gather insights.</p></div>\`;
      }
      insightsView.innerHTML = insightsHtml;
    }

    function renderDelta(delta, higherIsBetter) {
      if (delta === 0) return '<span class="trend neutral">(0)</span>';
      
      const isPositive = delta > 0;
      const displaySign = isPositive ? '+' + delta : delta;
      
      let trendClass = 'neutral';
      if (isPositive) {
        trendClass = higherIsBetter ? 'up' : 'down';
      } else {
        trendClass = higherIsBetter ? 'down' : 'up';
      }

      return \`<span class="trend \${trendClass}">(\${displaySign})</span>\`;
    }

    function escapeHtml(str) {
      return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }
  </script>
</body>
</html>`;
  }
}
