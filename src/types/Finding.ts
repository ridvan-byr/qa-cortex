export interface Finding {
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
