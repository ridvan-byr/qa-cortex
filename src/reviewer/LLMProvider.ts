import type { ReviewContext } from '../types/ReviewContext';
import type { ReviewResult } from '../types/ReviewResult';
import type { TestDesignResult } from '../types/TestDesignResult';

export interface LLMProvider {
  /**
   * Reviews the given test context against the loaded rule contents using an LLM.
   */
  review(context: ReviewContext, ruleContents: string[]): Promise<Omit<ReviewResult, 'score'>>;

  /**
   * Analyzes the context and generates missing test design scenarios.
   */
  designTests(context: ReviewContext, ruleContents: string[]): Promise<TestDesignResult>;
}
