export type FindingCategory =
  | 'BrittleLocator'
  | 'HardcodedWait'
  | 'SharedState'
  | 'MissingAssertion'
  | 'WeakAssertion'
  | 'SelectorLeak'
  | 'ResourceCleanup'
  | 'Duplicate'
  | 'TestNaming'
  | 'HardcodedTestData'
  | 'Unspecified';

export interface Finding {
  ruleId?: string; // Optional unique rule identifier (e.g., LOCATOR_001)
  category?: FindingCategory; // Structured category type for scoring
  title: string;
  description: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  confidence: {
    level: number; // e.g. 95
    justification: string[]; // e.g. ["XPath prefix detected", "No exclusions found"]
  };
  evidence: string; // Mandatory code evidence block
  recommendation: string; // Code correction or architectural suggestion
}


