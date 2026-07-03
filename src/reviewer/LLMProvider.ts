import type { ReviewContext } from '../types/ReviewContext';
import type { ReviewResult } from '../types/ReviewResult';

export interface LLMProvider {
  /**
   * Reviews the given test context against the loaded rule contents using an LLM.
   */
  review(context: ReviewContext, ruleContents: string[]): Promise<Omit<ReviewResult, 'score'>>;
}
