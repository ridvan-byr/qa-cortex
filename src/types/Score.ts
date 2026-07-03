export interface Score {
  fileCoverage: number;
  featureCoverage: number | string; // e.g. 90 or "Requires Repository Analysis"
  qualityScore: number;
  qualityChecklist: {
    pomEncapsulation: boolean;
    resilientLocators: boolean;
    stateIsolation: boolean;
    autoWaiting: boolean;
    strongAssertions: boolean;
  };
  riskScore: number; // calculated as featureRisk * maxSeverity
  riskLevel: 'Critical' | 'High' | 'Medium' | 'Low';
  riskDetails: string;
  maintainabilityScore: number;
  maintainabilityChecklist: {
    meaninglessWaitAvoided: boolean;
    dryPrinciple: boolean;
    modularLocators: boolean;
  };
}
