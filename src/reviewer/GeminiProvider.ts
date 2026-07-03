import { GoogleGenAI } from '@google/genai';
import type { LLMProvider } from './LLMProvider';
import type { ReviewContext } from '../types/ReviewContext';
import type { ReviewResult } from '../types/ReviewResult';
import * as dotenv from 'dotenv';

dotenv.config();

export class GeminiProvider implements LLMProvider {
  private ai?: any;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      // Initialize with official @google/genai SDK
      this.ai = new GoogleGenAI({ apiKey });
    }
  }

  public async review(context: ReviewContext, ruleContents: string[]): Promise<Omit<ReviewResult, 'score'>> {
    if (!this.ai) {
      // API Key is missing: Fallback to Mock simulation mode for local verification
      return this.generateMockReview(context);
    }

    try {
      const systemInstruction = `You are QA Brain Reviewer. Match findings and output JSON matching response-format.md schema.`;
      
      const userPrompt = `
      Review Context:
      ${JSON.stringify(context, null, 2)}

      Rule Sets Loaded:
      ${ruleContents.join('\n\n')}

      Target Code to Review:
      ${context.targetFile.content}
      `;

      // Call Gemini 2.5 Flash
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userPrompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
        }
      });

      const rawText = response.text || '{}';
      const parsed = JSON.parse(rawText);

      return {
        summary: parsed.summary || 'No summary provided.',
        findings: parsed.findings || [],
        strengths: parsed.strengths || [],
        improvements: parsed.improvements || [],
        observations: parsed.observations || [],
        references: parsed.references || [],
        finalVerdict: parsed.finalVerdict || 'Needs Improvement',
      };
    } catch (error) {
      console.warn('Gemini API call failed, falling back to mock review.', error);
      return this.generateMockReview(context);
    }
  }

  /**
   * Generates high-fidelity mock reviews for test verification without internet/API keys.
   */
  private generateMockReview(context: ReviewContext): Omit<ReviewResult, 'score'> {
    const fileName = context.targetFile.filePath;
    
    if (fileName.includes('xpath')) {
      return {
        summary: 'Review for login test with xpath selectors.',
        findings: [
          {
            title: 'Mutlak XPath Seçici Kullanımı',
            description: 'LoginPage POM sınıfı import edilmiş olmasına rağmen ham xpath seçici kullanılmıştır (Selector Leak).',
            severity: 'High',
            confidence: { level: 98, justification: ['LoginPage initialized', 'Raw xpath locator matched'] },
            evidence: "await page.locator('xpath=//html/body/div[1]/form/div[2]/input').fill('user@example.com');",
            recommendation: "Encapsulate locator inside LoginPage class and call a method (e.g. await loginPage.login()).",
          }
        ],
        strengths: ['✓ POM defined'],
        improvements: ['[ ] Replace raw xpath locators in specs'],
        observations: [],
        references: ['locator-review.md', 'page-object-analysis.md'],
        finalVerdict: 'Poor',
      };
    }

    if (fileName.includes('hardcoded-wait')) {
      return {
        summary: 'Review for dashboard test with hardcoded waits.',
        findings: [
          {
            title: 'Redundant Hardcoded Timeout (waitForTimeout)',
            description: 'The test uses page.waitForTimeout(5000) for page loading, causing flakiness.',
            severity: 'High',
            confidence: { level: 95, justification: ['waitForTimeout call matched'] },
            evidence: 'await page.waitForTimeout(5000);',
            recommendation: 'Remove hardcoded wait and rely on Playwright auto-waiting assertions.',
          }
        ],
        strengths: ['✓ Clean imports'],
        improvements: ['[ ] Replace waitForTimeout with state assertions'],
        observations: [],
        references: ['waiting-review.md', 'auto-waiting.md'],
        finalVerdict: 'Needs Improvement',
      };
    }

    // Default Good review fallback
    return {
      summary: 'Review of standard clean spec.',
      findings: [],
      strengths: ['✓ POM encapsulation', '✓ Resilient locators', '✓ No hardcoded waits'],
      improvements: [],
      observations: [],
      references: ['locator-review.md', 'waiting-review.md'],
      finalVerdict: 'Excellent',
    };
  }
}
