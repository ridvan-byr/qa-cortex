import type { Finding } from './Finding';
import type { Score } from './Score';

export interface ReviewResult {
  summary: string;
  findings: Finding[];
  score: Score;
  strengths: string[];
  improvements: string[];
  observations: string[];
  references: string[];
  finalVerdict: 'Excellent' | 'Good' | 'Needs Improvement' | 'Poor';
}
