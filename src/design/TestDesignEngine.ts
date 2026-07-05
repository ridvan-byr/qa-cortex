import { RepositoryLoader } from '../loader/RepositoryLoader';
import { ContextBuilder } from '../loader/ContextBuilder';
import { KnowledgeRouter } from '../router/KnowledgeRouter';
import type { LLMProvider } from '../reviewer/LLMProvider';
import type { TestDesignResult } from '../types/TestDesignResult';

export class TestDesignEngine {
  private loader: RepositoryLoader;
  private knowledgeLoader: RepositoryLoader;
  private builder: ContextBuilder;
  private router: KnowledgeRouter;

  constructor(private rootPath: string, private llm: LLMProvider, private knowledgeRootPath: string = rootPath) {
    this.loader = new RepositoryLoader(rootPath);
    this.knowledgeLoader = new RepositoryLoader(knowledgeRootPath);
    this.builder = new ContextBuilder(this.loader);
    this.router = new KnowledgeRouter();
  }

  /**
   * Generates a test design analysis for the given target test file.
   */
  public async designTests(targetFilePath: string): Promise<TestDesignResult> {
    const targetFileContent = this.loader.readRawFile(targetFilePath);
    if (!targetFileContent) {
      throw new Error(`Target file not found at path: ${targetFilePath}`);
    }

    const context = this.builder.buildContext(targetFilePath, targetFileContent);

    // Route test design and framework rules
    const mappedRules = this.router.routeKnowledge(context);
    
    // Load rule contents
    const ruleContents: string[] = [];
    for (const rulePath of mappedRules) {
      const content = this.knowledgeLoader.readRawFile(rulePath);
      if (content) {
        ruleContents.push(`--- File: ${rulePath} ---\n${content}`);
      }
    }

    // Execute LLM test design analysis
    return this.llm.designTests(context, ruleContents);
  }
}
