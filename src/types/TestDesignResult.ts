export interface MissingScenario {
  id: string;
  title: string;
  category: 'Boundary Value' | 'Equivalence Partitioning' | 'Security' | 'Error Path' | 'Data Variation';
  description: string;
  explanation: string; // The reason why it's missing and why it's needed (QA context)
  criticality: 'HIGH' | 'MEDIUM' | 'LOW';
  evidence?: string; // What in the current code led to this missing scenario
  suggestedTemplate: {
    playwright: string; // Boilerplate Playwright test code
    selenium: string;   // Boilerplate Selenium WebDriver Node.js test code
  };
}

export interface TestDesignResult {
  fileName: string;
  framework: 'playwright' | 'selenium' | 'unknown';
  coverageScore: number; // 0 to 100 representing how well the current tests cover expected paths
  missingScenarios: MissingScenario[];
}
