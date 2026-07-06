import type { ReviewContext } from '../types/ReviewContext';
import type { Finding } from '../types/Finding';
import type { Score } from '../types/Score';
import type { ReviewResult } from '../types/ReviewResult';

export class ScoringEngine {
  /**
   * Calculates structural and risk scores deterministically based on findings and context.
   */
  public calculateScore(context: ReviewContext, findings: Finding[]): Score {
    // 1. Calculate File Coverage
    const fileCoverage = this.calculateFileCoverage(context, findings);
    
    // Feature Coverage requires cross-spec analysis
    const featureCoverage = this.calculateFeatureCoverage(context, fileCoverage);

    // 2. Quality and Maintainability Checklists
    const pomEncapsulation = this.checkPomEncapsulation(context, findings);
    const resilientLocators = !findings.some(f => f.category === 'BrittleLocator');
    const stateIsolation = !findings.some(f => f.category === 'SharedState' || f.category === 'ResourceCleanup');
    const autoWaiting = !findings.some(f => f.category === 'HardcodedWait');
    const strongAssertions = !findings.some(f => f.category === 'MissingAssertion');

    const qualityChecklist: Score['qualityChecklist'] = {
      pomEncapsulation,
      resilientLocators,
      stateIsolation,
      autoWaiting,
      strongAssertions,
    };

    const maintainabilityChecklist: Score['maintainabilityChecklist'] = {
      meaninglessWaitAvoided: autoWaiting,
      dryPrinciple: !findings.some(f => f.category === 'Duplicate'),
      modularLocators: pomEncapsulation && resilientLocators, // Must have encapsulation AND resilient locators
    };

    // Calculate Quality Score
    let qualityScore = 100;
    if (!pomEncapsulation) qualityScore -= 20; // heavier deduction for bypassing POM
    if (!resilientLocators) qualityScore -= 20; // heavier deduction for brittle locators
    if (!stateIsolation) qualityScore -= 20;
    if (!autoWaiting) qualityScore -= 15;
    if (!strongAssertions) qualityScore -= 20;
    if (qualityScore < 0) qualityScore = 0;

    // Calculate Maintainability Score
    let maintainabilityScore = 100;
    if (!maintainabilityChecklist.meaninglessWaitAvoided) maintainabilityScore -= 25;
    if (!maintainabilityChecklist.dryPrinciple) maintainabilityScore -= 20;
    if (!maintainabilityChecklist.modularLocators) maintainabilityScore -= 25;
    if (maintainabilityScore < 0) maintainabilityScore = 0;

    // 3. Calculate Risk: Feature Risk * Max Issue Severity
    const featureRiskMap: Record<string, number> = {
      'Authentication': 4,
      'Checkout': 4,
      'File Management': 3,
      'Search': 2,
      'API': 3,
      'General UI': 1,
    };
    
    const featureRisk = featureRiskMap[context.targetFile.detectedFeature] || 1;

    let maxSeverityScore = 1; // Default Low
    for (const f of findings) {
      let score = 1;
      if (f.severity === 'Critical') score = 4;
      else if (f.severity === 'High') score = 3;
      else if (f.severity === 'Medium') score = 2;
      
      if (score > maxSeverityScore) maxSeverityScore = score;
    }

    const riskScore = featureRisk * maxSeverityScore;
    let riskLevel: Score['riskLevel'] = 'Low';
    if (riskScore >= 12) riskLevel = 'Critical';
    else if (riskScore >= 8) riskLevel = 'High';
    else if (riskScore >= 4) riskLevel = 'Medium';

    const riskDetails = `Feature Risk: ${context.targetFile.detectedFeature} (${featureRisk}) * Max Issue Severity (${maxSeverityScore}) = ${riskScore}`;

    return {
      fileCoverage,
      featureCoverage,
      qualityScore,
      qualityChecklist,
      riskScore,
      riskLevel,
      riskDetails,
      maintainabilityScore,
      maintainabilityChecklist,
    };
  }

  /**
   * Deterministically calculates the final verdict based on the quality score.
   */
  public calculateVerdict(qualityScore: number): ReviewResult['finalVerdict'] {
    if (qualityScore >= 90) return 'Excellent';
    if (qualityScore >= 75) return 'Good';
    if (qualityScore >= 50) return 'Needs Improvement';
    return 'Poor';
  }

  private calculateFileCoverage(context: ReviewContext, findings: Finding[]): number {
    let score = 100;
    
    // Deduct for missing areas found
    if (findings.some(f => f.category === 'MissingAssertion')) {
      score -= 20;
    }
    
    const content = context.targetFile.content;
    
    // Check missing negative paths
    if (context.targetFile.detectedFeature === 'Authentication' && !content.includes('invalid') && !content.includes('error')) {
      score -= 20;
    }
    
    // Check BVA via structural regex parsing
    if (!this.detectBvaCoverage(content)) {
      score -= 15;
    }

    // Check Unicode/Locale: checks for non-ASCII characters (e.g. Turkish characters, emojis) representing i18n search test data
    const hasUnicodeCharacters = /[^\x00-\x7F]/.test(content);
    if (context.targetFile.detectedFeature === 'Search' && !hasUnicodeCharacters) {
      score -= 10;
    }

    if (score < 0) score = 0;
    return score;
  }

  private detectBvaCoverage(content: string): boolean {
    // 1. Find all test/it names
    const testTitleRegex = /(?:test|it)(?:\.\w+)?\s*\(\s*['"]([^'"]+)['"]/g;
    let match;
    const testTitles: string[] = [];
    while ((match = testTitleRegex.exec(content)) !== null) {
      testTitles.push(match[1].toLowerCase());
    }

    // Check if any test title explicitly mentions boundary/BVA keywords
    const bvaKeywords = /\b(boundary|bva|limit|edge|empty|max|min|negative|zero|null|undefined|overflow|underflow|invalid|bounds)\b/i;
    const hasBvaTitle = testTitles.some(title => bvaKeywords.test(title));
    if (hasBvaTitle) return true;

    // 2. Check the code body for boundary value test patterns
    const bvaPatterns = [
      /['"]{2}\s*,\s*['"]{2}/, // empty strings as parameters
      /\.length\s*[><=]=?\s*\d+/, // length checks
      /\b(max_length|min_length|maxLength|minLength|empty_str)\b/, // variable names
      /expect\(.*\)\.(?:toBeFalsy|toBeNull|toBeUndefined)\b/, // null checks
    ];
    return bvaPatterns.some(pattern => pattern.test(content));
  }

  private calculateFeatureCoverage(context: ReviewContext, fileCoverage: number): number | string {
    // If run as single file in isolation, require full repository analysis
    if (!context.repositoryInfo.structure.testsDir) {
      return 'Requires Repository Analysis';
    }
    
    // Fallback to File Coverage if no companion files are detected
    return fileCoverage;
  }

  private checkPomEncapsulation(context: ReviewContext, findings: Finding[]): boolean {
    // If POM files are present, check if we leaked raw selectors in this spec
    const hasPomFiles = context.pageObjects.length > 0;
    const hasLeakFinding = findings.some(f => f.category === 'SelectorLeak' || f.ruleId === 'LOCATOR_001');
    
    if (hasPomFiles && hasLeakFinding) {
      return false; // Violates encapsulation
    }
    return true; // encapsulated or POM not present (non-penalizing)
  }
}
