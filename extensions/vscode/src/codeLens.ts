import * as path from 'path';
import * as vscode from 'vscode';
import type { LastReviewState } from './types';

export class QaBrainCodeLensProvider implements vscode.CodeLensProvider {
  private reviews = new Map<string, LastReviewState>();

  public update(state: LastReviewState): void {
    this.reviews.set(path.normalize(state.filePath), state);
  }

  public clear(): void {
    this.reviews.clear();
  }

  public provideCodeLenses(document: vscode.TextDocument): vscode.CodeLens[] {
    const config = vscode.workspace.getConfiguration('qaBrain');
    if (!config.get<boolean>('showCodeLens', true)) return [];

    // Language-agnostic test file check using dynamic Scanner loading
    let isTest = false;
    try {
      const repoRoot = path.resolve(__dirname, '../../../..');
      const corePath = path.join(repoRoot, 'dist', 'src');
      const scannerModule = require(path.join(corePath, 'core', 'Scanner.js'));
      isTest = scannerModule.Scanner.isTestFile(path.basename(document.fileName));
    } catch (err) {
      // Safe regex fallback in case of require failures
      isTest = /\.(spec|test)\.[jt]sx?$/.test(document.fileName) || document.fileName.endsWith('.py');
    }

    if (!isTest) return [];

    const state = this.reviews.get(path.normalize(document.fileName));
    const summary = state
      ? `🧠 Quality ${state.qualityScore} • Risk ${state.riskScore}`
      : '🧠 QA Brain: Review this test';

    const top = new vscode.Range(new vscode.Position(0, 0), new vscode.Position(0, 0));
    const lenses: vscode.CodeLens[] = [
      new vscode.CodeLens(top, {
        title: summary,
        command: 'qaBrain.reviewCurrentFile',
        arguments: [document.uri],
      })
    ];

    if (state && state.reportPath) {
      lenses.push(
        new vscode.CodeLens(top, {
          title: '📖 Open Report',
          command: 'qaBrain.openLatestReport',
          arguments: [vscode.Uri.file(state.reportPath)]
        })
      );
    }

    return lenses;
  }
}
