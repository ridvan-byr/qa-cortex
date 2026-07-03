import type { ReviewResult } from '../types/ReviewResult';

export class ReportGenerator {
  /**
   * Formats the final ReviewResult object into a structured Markdown report.
   */
  public generateMarkdown(result: ReviewResult): string {
    let report = '';

    report += `# QA Brain Review Report\n\n`;
    report += `## Summary\n\n${result.summary}\n\n---\n\n`;

    report += `## Findings\n\n`;
    if (result.findings.length === 0) {
      report += `No findings detected.\n\n`;
    } else {
      for (const f of result.findings) {
        report += `### Finding: ${f.title}\n`;
        report += `- **Description**: ${f.description}\n`;
        report += `- **Severity**: ${f.severity}\n`;
        report += `- **Confidence**: ${f.confidence.level}% (${f.confidence.justification.join(', ')})\n`;
        report += `- **Evidence**:\n  \`\`\`typescript\n  ${f.evidence}\n  \`\`\`\n`;
        report += `- **Recommendation**: ${f.recommendation}\n\n`;
      }
    }

    report += `---\n\n## Metrics\n\n`;
    report += `- **File Coverage Score**: ${result.score.fileCoverage}/100\n`;
    report += `- **Feature Coverage Score**: ${result.score.featureCoverage}/100\n`;
    report += `- **Quality Score**: ${result.score.qualityScore}/100\n`;
    report += `  - [${result.score.qualityChecklist.pomEncapsulation ? 'x' : ' '}] POM Encapsulation\n`;
    report += `  - [${result.score.qualityChecklist.resilientLocators ? 'x' : ' '}] Resilient Locators\n`;
    report += `  - [${result.score.qualityChecklist.stateIsolation ? 'x' : ' '}] State Isolation\n`;
    report += `  - [${result.score.qualityChecklist.autoWaiting ? 'x' : ' '}] Auto Waiting\n`;
    report += `  - [${result.score.qualityChecklist.strongAssertions ? 'x' : ' '}] Strong Assertions\n\n`;

    report += `- **Risk Score**: ${result.score.riskLevel} (${result.score.riskDetails})\n`;
    report += `- **Maintainability Score**: ${result.score.maintainabilityScore}/100\n`;
    report += `  - [${result.score.maintainabilityChecklist.meaninglessWaitAvoided ? 'x' : ' '}] Meaningless Wait Avoided\n`;
    report += `  - [${result.score.maintainabilityChecklist.dryPrinciple ? 'x' : ' '}] DRY Principle\n`;
    report += `  - [${result.score.maintainabilityChecklist.modularLocators ? 'x' : ' '}] Modular Locators\n\n`;

    report += `---\n\n## Strengths\n\n`;
    for (const s of result.strengths) {
      report += `- ${s}\n`;
    }
    if (result.strengths.length === 0) report += `None\n`;

    report += `\n---\n\n## Improvements\n\n`;
    for (const imp of result.improvements) {
      report += `- ${imp}\n`;
    }
    if (result.improvements.length === 0) report += `None\n`;

    report += `\n---\n\n## Observations\n\n`;
    for (const obs of result.observations) {
      report += `- ${obs}\n`;
    }
    if (result.observations.length === 0) report += `None\n`;

    report += `\n---\n\n## References\n\n`;
    for (const ref of result.references) {
      report += `- ${ref}\n`;
    }
    if (result.references.length === 0) report += `None\n`;

    report += `\n---\n\n## Final Verdict\n\n**${result.finalVerdict}**\n`;

    return report;
  }
}
