import { ReviewPipeline } from '../core/ReviewPipeline';
import { Scanner } from '../core/Scanner';
import { RepositoryLoader } from '../loader/RepositoryLoader';
import { ContextBuilder } from '../loader/ContextBuilder';
import { KnowledgeRouter } from '../router/KnowledgeRouter';
import { GeminiProvider } from '../reviewer/GeminiProvider';
import * as fs from 'fs';
import * as path from 'path';

type RepositorySize = 'small' | 'medium' | 'large' | 'enterprise';
type ValidationFramework = 'playwright' | 'selenium';

interface ValidationRepository {
  id: string;
  name: string;
  url?: string;
  localPath: string;
  size: RepositorySize;
  tags: string[];
  notes?: string;
}

interface ValidationConfig {
  framework?: ValidationFramework;
  reportTitle?: string;
  repositories: ValidationRepository[];
  ignorePatterns?: string[];
  maxFilesPerRepository?: number;
  runGeminiComparison?: boolean;
  outputDir?: string;
  markdownReportName?: string;
  jsonReportName?: string;
  metricsOutputPath?: string;
}

interface RepositoryRunResult {
  id: string;
  name: string;
  localPath: string;
  size: RepositorySize;
  tags: string[];
  exists: boolean;
  filesReviewed: number;
  findings: number;
  criticalFindings: number;
  averageReviewTimeMs: number;
  ruleOnlyPrecision: string;
  ruleOnlyRecall: string;
  geminiPrecision: string;
  geminiRecall: string;
  files: Array<{
    file: string;
    reviewTimeMs: number;
    findings: Array<{
      title: string;
      severity: string;
      evidence: string;
      recommendation: string;
    }>;
  }>;
  notes: string[];
}

export class ValidationRunner {
  public static async run(configPath = 'validation/repositories.json'): Promise<void> {
    const resolvedConfigPath = path.resolve(configPath);
    if (!fs.existsSync(resolvedConfigPath)) {
      throw new Error(`Validation config not found: ${configPath}. Copy validation/repositories.example.json to validation/repositories.json and fill local paths.`);
    }

    const config = this.readConfig(resolvedConfigPath);
    const outputDir = path.resolve(config.outputDir || 'validation/reports');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const ruleUsage = new Map<string, number>();
    const results: RepositoryRunResult[] = [];

    for (const repo of config.repositories) {
      results.push(await this.runRepository(repo, config, ruleUsage));
    }

    const totalFiles = results.reduce((sum, r) => sum + r.filesReviewed, 0);
    if (totalFiles === 0) {
      throw new Error('No files were reviewed during validation. Ensure repositories are cloned and paths are correct.');
    }

    const selectionWarnings = [
      ...this.validateRepositorySelection(config.repositories, config),
      ...this.validateActiveRepositoryCoverage(results, config),
    ];
    const report = this.buildMarkdownReport(results, ruleUsage, selectionWarnings, config);
    const markdownReportPath = path.join(outputDir, config.markdownReportName || 'latest-validation-report.md');
    const jsonReportPath = path.join(outputDir, config.jsonReportName || 'latest-validation-report.json');
    fs.writeFileSync(markdownReportPath, report, 'utf8');
    fs.writeFileSync(jsonReportPath, JSON.stringify({
      generatedAt: new Date().toISOString(),
      framework: config.framework,
      selectionWarnings,
      repositories: results,
      ruleCoverage: this.formatRuleCoverage(ruleUsage),
    }, null, 2), 'utf8');
    if (config.metricsOutputPath) {
      const metricsOutputPath = path.resolve(config.metricsOutputPath);
      const metricsDir = path.dirname(metricsOutputPath);
      if (!fs.existsSync(metricsDir)) {
        fs.mkdirSync(metricsDir, { recursive: true });
      }
      fs.writeFileSync(metricsOutputPath, JSON.stringify(this.buildMetrics(results, ruleUsage, selectionWarnings, config), null, 2), 'utf8');
    }

    console.log(`Validation report written to ${markdownReportPath}`);
  }

  private static readConfig(configPath: string): ValidationConfig {
    const parsed = JSON.parse(fs.readFileSync(configPath, 'utf8')) as ValidationConfig;
    return {
      framework: parsed.framework || 'playwright',
      reportTitle: parsed.reportTitle || 'QA Cortex Validation Report',
      repositories: parsed.repositories || [],
      ignorePatterns: parsed.ignorePatterns || [],
      maxFilesPerRepository: parsed.maxFilesPerRepository || 50,
      runGeminiComparison: parsed.runGeminiComparison || false,
      outputDir: parsed.outputDir || 'validation/reports',
      markdownReportName: parsed.markdownReportName || 'latest-validation-report.md',
      jsonReportName: parsed.jsonReportName || 'latest-validation-report.json',
      metricsOutputPath: parsed.metricsOutputPath,
    };
  }

  private static async runRepository(
    repo: ValidationRepository,
    config: ValidationConfig,
    ruleUsage: Map<string, number>
  ): Promise<RepositoryRunResult> {
    const repoRoot = path.resolve(repo.localPath);
    const exists = fs.existsSync(repoRoot) && fs.statSync(repoRoot).isDirectory();
    const notes: string[] = [];

    if (!exists) {
      return this.emptyResult(repo, false, [`Local path not found: ${repo.localPath}`]);
    }

    const files = Scanner.scanDirectory(repoRoot, config.ignorePatterns || [])
      .filter(file => this.isLikelyFrameworkTest(file, config.framework || 'playwright'))
      .slice(0, config.maxFilesPerRepository || 50);

    if (files.length === 0) {
      return this.emptyResult(repo, true, [`No ${this.frameworkLabel(config)} specs found; excluded from active validation coverage.`]);
    }

    const ruleOnlyPipeline = new ReviewPipeline(repoRoot, new GeminiProvider(''), '.');
    const geminiPipeline = config.runGeminiComparison ? new ReviewPipeline(repoRoot, new GeminiProvider(), '.') : undefined;

    let findings = 0;
    let criticalFindings = 0;
    let totalDurationMs = 0;
    const fileResults: RepositoryRunResult['files'] = [];

    for (const file of files) {
      const startedAt = Date.now();
      const { result } = await this.runQuietly(() => ruleOnlyPipeline.runPipeline(file));
      const reviewTimeMs = Date.now() - startedAt;
      totalDurationMs += reviewTimeMs;
      findings += result.findings.length;
      criticalFindings += result.findings.filter(f => f.severity === 'Critical' || f.severity === 'High').length;
      this.recordRuleUsage(repoRoot, file, ruleUsage);
      const relativeFile = path.relative(repoRoot, file).replace(/\\/g, '/');
      fileResults.push({
        file: relativeFile,
        reviewTimeMs,
        findings: result.findings.map(f => ({
          title: f.title,
          severity: f.severity,
          evidence: f.evidence,
          recommendation: f.recommendation,
        })),
      });

      if (geminiPipeline) {
        await this.runQuietly(() => geminiPipeline.runPipeline(file));
      }
    }

    if (!config.runGeminiComparison) {
      notes.push('LLM provider comparison skipped. Set runGeminiComparison=true to enable it.');
    }

    return {
      id: repo.id,
      name: repo.name,
      localPath: repo.localPath,
      size: repo.size,
      tags: repo.tags,
      exists,
      filesReviewed: files.length,
      findings,
      criticalFindings,
      averageReviewTimeMs: Math.round(totalDurationMs / files.length),
      ruleOnlyPrecision: 'Requires manual triage',
      ruleOnlyRecall: 'Requires manual triage',
      geminiPrecision: config.runGeminiComparison ? 'Requires manual triage' : 'Skipped',
      geminiRecall: config.runGeminiComparison ? 'Requires manual triage' : 'Skipped',
      files: fileResults,
      notes,
    };
  }

  private static recordRuleUsage(repoRoot: string, file: string, ruleUsage: Map<string, number>): void {
    const content = fs.readFileSync(file, 'utf8');
    const context = new ContextBuilder(new RepositoryLoader(repoRoot)).buildContext(file, content);
    const rules = new KnowledgeRouter().routeKnowledge(context);
    for (const rule of rules) {
      ruleUsage.set(rule, (ruleUsage.get(rule) || 0) + 1);
    }
  }

  private static isLikelyFrameworkTest(file: string, framework: ValidationFramework): boolean {
    const content = fs.readFileSync(file, 'utf8');
    if (framework === 'selenium') {
      const lower = content.toLowerCase();
      return lower.includes('selenium')
        || lower.includes('webdriver')
        || /\b(?:driver|browser)\b/.test(lower)
        || /\bnew\s+Builder\b/.test(content)
        || /\bBy\b/.test(content);
    }

    return content.includes('@playwright/test')
      || content.includes('playwright')
      || /\bpage\./.test(content)
      || /\bbrowser\./.test(content)
      || /\btest\.step\s*\(/.test(content)
      || /\bexpect\s*\(\s*page/.test(content);
  }

  private static async runQuietly<T>(operation: () => Promise<T>): Promise<T> {
    const originalLog = console.log;
    console.log = () => undefined;
    try {
      return await operation();
    } finally {
      console.log = originalLog;
    }
  }

  private static emptyResult(repo: ValidationRepository, exists: boolean, notes: string[]): RepositoryRunResult {
    return {
      id: repo.id,
      name: repo.name,
      localPath: repo.localPath,
      size: repo.size,
      tags: repo.tags,
      exists,
      filesReviewed: 0,
      findings: 0,
      criticalFindings: 0,
      averageReviewTimeMs: 0,
      ruleOnlyPrecision: 'Not run',
      ruleOnlyRecall: 'Not run',
      geminiPrecision: 'Not run',
      geminiRecall: 'Not run',
      files: [],
      notes,
    };
  }

  private static validateRepositorySelection(repositories: ValidationRepository[], config: ValidationConfig): string[] {
    const warnings: string[] = [];
    if ((config.framework || 'playwright') === 'selenium') {
      if (repositories.length < 5) warnings.push('Selenium calibration should include at least 5 candidate repositories before final sign-off.');
      for (const repo of repositories) {
        if (!repo.tags.includes('selenium-webdriver')) {
          warnings.push(`${repo.name} should be tagged selenium-webdriver or replaced with a clearer Selenium WebDriver candidate.`);
        }
      }
      return warnings;
    }

    const countBySize = (size: RepositorySize) => repositories.filter(r => r.size === size).length;
    const countByTag = (tag: string) => repositories.filter(r => r.tags.includes(tag)).length;

    if (repositories.length < 10) warnings.push('Selection needs at least 10 repositories.');
    if (countBySize('small') < 2) warnings.push('Selection needs at least 2 small repositories.');
    if (countBySize('medium') < 2) warnings.push('Selection needs at least 2 medium repositories.');
    if (countBySize('large') < 2) warnings.push('Selection needs at least 2 large repositories.');
    if (countBySize('enterprise') < 1 && countByTag('enterprise-style') < 1) warnings.push('Selection needs at least 1 enterprise-style repository.');
    if (countByTag('api-heavy') < 1) warnings.push('Selection needs at least 1 API-heavy repository.');
    if (countByTag('authentication-heavy') < 1) warnings.push('Selection needs at least 1 authentication-heavy repository.');
    if (countByTag('multi-project') < 1) warnings.push('Selection needs at least 1 multi-project repository.');

    return warnings;
  }

  private static validateActiveRepositoryCoverage(results: RepositoryRunResult[], config: ValidationConfig): string[] {
    const warnings: string[] = [];
    const activeResults = results.filter(result => result.exists && result.filesReviewed > 0);
    const countBySize = (size: RepositorySize) => activeResults.filter(r => r.size === size).length;
    const frameworkLabel = this.frameworkLabel(config);

    if ((config.framework || 'playwright') === 'selenium') {
      if (activeResults.length < 5) {
        warnings.push(`Active Selenium calibration coverage has ${activeResults.length} repositories with ${frameworkLabel} specs; clone or replace candidates before final Sprint 13D sign-off.`);
      }
      for (const result of activeResults) {
        if (result.filesReviewed < 3) {
          warnings.push(`${result.name} has ${result.filesReviewed} active Selenium test files; preferred minimum is 3.`);
        }
      }
      return warnings;
    }

    if (activeResults.length < 10) {
      warnings.push(`Active validation coverage has ${activeResults.length} repositories with ${frameworkLabel} specs; replace no-spec repositories before final Sprint 11 sign-off.`);
    }
    if (countBySize('small') < 2) {
      warnings.push(`Active validation coverage has ${countBySize('small')} small repositories with ${frameworkLabel} specs; minimum target is 2.`);
    }

    return warnings;
  }

  private static formatRuleCoverage(ruleUsage: Map<string, number>): Array<{ rule: string; triggerCount: number; confidence: string }> {
    return Array.from(ruleUsage.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([rule, triggerCount]) => ({
        rule,
        triggerCount,
        confidence: this.calculateRuleConfidence(triggerCount),
      }));
  }

  private static calculateRuleConfidence(triggerCount: number): string {
    if (triggerCount >= 10) return 'High';
    if (triggerCount >= 3) return 'Medium';
    if (triggerCount >= 1) return 'Low';
    return 'None';
  }

  private static buildMarkdownReport(
    results: RepositoryRunResult[],
    ruleUsage: Map<string, number>,
    selectionWarnings: string[],
    config: ValidationConfig
  ): string {
    const totalFiles = results.reduce((sum, r) => sum + r.filesReviewed, 0);
    const totalFindings = results.reduce((sum, r) => sum + r.findings, 0);
    const avgTime = totalFiles > 0
      ? Math.round(results.reduce((sum, r) => sum + (r.averageReviewTimeMs * r.filesReviewed), 0) / totalFiles)
      : 0;
    const coverage = this.formatRuleCoverage(ruleUsage);

    const lines: string[] = [];
    lines.push(`# ${config.reportTitle || 'QA Cortex Validation Report'}`);
    lines.push('');
    lines.push(`Generated: ${new Date().toISOString()}`);
    lines.push('');
    lines.push('## Summary');
    lines.push('');
    lines.push(`- Repositories configured: ${results.length}`);
    lines.push(`- Framework: ${this.frameworkLabel(config)}`);
    lines.push(`- Files reviewed: ${totalFiles}`);
    lines.push(`- Findings: ${totalFindings}`);
    lines.push(`- Average review time: ${avgTime}ms`);
    lines.push(`- LLM provider comparison: ${config.runGeminiComparison ? 'Enabled' : 'Deferred'}`);
    lines.push('');
    lines.push('## Repository Selection');
    lines.push('');
    if (selectionWarnings.length === 0) {
      lines.push('- Minimum selection criteria satisfied.');
    } else {
      for (const warning of selectionWarnings) {
        lines.push(`- ${warning}`);
      }
    }
    lines.push('');
    lines.push('## Repository Results');
    lines.push('');
    lines.push('| Repository | Size | Files | Findings | Critical/High | Avg Time | Notes |');
    lines.push('| :--- | :--- | ---: | ---: | ---: | ---: | :--- |');
    for (const result of results) {
      lines.push(`| ${result.name} | ${result.size} | ${result.filesReviewed} | ${result.findings} | ${result.criticalFindings} | ${result.averageReviewTimeMs}ms | ${result.notes.join('; ') || '-'} |`);
    }
    lines.push('');
    lines.push('## Accuracy Matrix');
    lines.push('');
    lines.push('| Category | Precision | Recall |');
    lines.push('| :--- | :--- | :--- |');
    for (const category of ['Locator', 'Waiting', 'POM', 'Repository', 'Assertions', 'Fixtures', 'Isolation']) {
      lines.push(`| ${category} | Requires manual triage | Requires manual triage |`);
    }
    lines.push('');
    lines.push('## Rule Coverage');
    lines.push('');
    lines.push('| Rule | Trigger Count | Confidence |');
    lines.push('| :--- | ---: | :--- |');
    if (coverage.length === 0) {
      lines.push('| No rules routed | 0 | None |');
    } else {
      for (const item of coverage) {
        lines.push(`| ${item.rule} | ${item.triggerCount} | ${item.confidence} |`);
      }
    }
    lines.push('');
    lines.push('## Calibration Actions');
    lines.push('');
    lines.push('- Rules To Keep: Requires manual triage');
    lines.push('- Rules To Modify: Requires manual triage');
    lines.push('- Rules To Merge: Requires manual triage');
    lines.push('- Rules To Remove: Requires manual triage');
    if ((config.framework || 'playwright') === 'selenium') {
      lines.push('');
      lines.push('## Selenium Calibration Metrics');
      lines.push('');
      lines.push('- Primary goal: improve precision through calibration.');
      lines.push('- Precision target: approximately 80%+ as a calibration signal, not a hard gate.');
      lines.push('- Recall: qualitative assessment only; large-scale recall measurement is deferred until the benchmark corpus grows.');
      lines.push('- Decision format: GO / CONDITIONAL GO / NO-GO.');
    }
    lines.push('');
    lines.push('## Findings Requiring Triage');
    lines.push('');
    let findingIndex = 1;
    for (const result of results) {
      for (const file of result.files) {
        for (const finding of file.findings) {
          lines.push(`### F${findingIndex}: ${finding.title}`);
          lines.push('');
          lines.push(`- Repository: ${result.name}`);
          lines.push(`- File: ${file.file}`);
          lines.push(`- Severity: ${finding.severity}`);
          lines.push(`- Evidence: \`${finding.evidence.replace(/`/g, "'")}\``);
          lines.push(`- Recommendation: ${finding.recommendation}`);
          if ((config.framework || 'playwright') === 'selenium') {
            lines.push('- Expected: TBD');
            lines.push('- Actual: TBD');
            lines.push('- Triage: TBD');
            lines.push('- Reason: TBD');
            lines.push('- Action: keep rule / adjust rule / add benchmark / downgrade severity / document limitation / ignore repo');
          } else {
            lines.push('- Triage: TBD');
            lines.push('- Action: New benchmark / Rule improvement / Documented justification');
          }
          lines.push('');
          findingIndex++;
        }
      }
    }
    if (findingIndex === 1) {
      lines.push('No findings generated in this validation run.');
      lines.push('');
    }
    lines.push('## False Positive / False Negative Learning');
    lines.push('');
    lines.push('Every false positive and false negative must produce one of: new benchmark, rule improvement, or documented justification.');
    if ((config.framework || 'playwright') === 'selenium') {
      lines.push('');
      lines.push('## Go Decision');
      lines.push('');
      lines.push('- Decision: TBD');
      lines.push('- GO: Selenium Foundation Validated');
      lines.push('- CONDITIONAL GO: Limited support, more calibration needed');
      lines.push('- NO-GO: Adapter signal quality insufficient');
      lines.push('');
      lines.push('## Next Actions');
      lines.push('');
      lines.push('- Complete manual triage for every Selenium finding.');
      lines.push('- Convert each FP/FN into a benchmark, rule adjustment, severity downgrade, or documented limitation.');
      lines.push('- Keep Playwright benchmark behavior semantically unchanged while calibrating Selenium.');
    }

    return lines.join('\n');
  }

  private static buildMetrics(
    results: RepositoryRunResult[],
    ruleUsage: Map<string, number>,
    selectionWarnings: string[],
    config: ValidationConfig
  ): Record<string, unknown> {
    const files = results.reduce((sum, result) => sum + result.filesReviewed, 0);
    const findings = results.reduce((sum, result) => sum + result.findings, 0);
    const activeRepositories = results.filter(result => result.exists && result.filesReviewed > 0).length;

    return {
      generatedAt: new Date().toISOString(),
      framework: config.framework || 'playwright',
      repositoriesConfigured: results.length,
      activeRepositories,
      filesReviewed: files,
      findings,
      truePositives: null,
      falsePositives: null,
      falseNegativeCandidates: null,
      precision: null,
      precisionTarget: (config.framework || 'playwright') === 'selenium' ? '~80%+ calibration signal; final decision based on manual triage' : null,
      recall: (config.framework || 'playwright') === 'selenium' ? 'Qualitative assessment only' : null,
      ruleCoverage: this.formatRuleCoverage(ruleUsage),
      selectionWarnings,
      goDecision: 'TBD',
    };
  }

  private static frameworkLabel(config: ValidationConfig): string {
    return (config.framework || 'playwright') === 'selenium'
      ? 'Selenium WebDriver for Node.js'
      : 'Playwright';
  }
}

if (require.main === module) {
  ValidationRunner.run(process.argv[2]).catch(error => {
    console.error('Validation failed:', error.message);
    process.exit(1);
  });
}
