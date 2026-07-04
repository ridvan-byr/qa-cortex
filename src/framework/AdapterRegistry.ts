import type {
  FrameworkAdapter,
  FrameworkAdapterResult,
  FrameworkDetectionInput,
  KnowledgeProfile,
} from './types';
import { PlaywrightAdapter } from './adapters/PlaywrightAdapter';

export class AdapterRegistry {
  private readonly adapters: FrameworkAdapter[];

  constructor(adapters: FrameworkAdapter[] = [new PlaywrightAdapter()]) {
    this.adapters = adapters;
  }

  public resolve(input: FrameworkDetectionInput): FrameworkAdapterResult {
    const adapter = this.adapters.find(candidate => candidate.detect(input));
    if (!adapter) {
      return {
        adapterName: 'unknown',
        context: {
          framework: 'unknown',
          targetFile: input.targetFile,
        },
        signals: [],
        knowledgeProfile: this.emptyKnowledgeProfile(),
      };
    }

    const context = adapter.buildContext(input);
    const signals = adapter.buildSignals(context);
    return {
      adapterName: adapter.name,
      context,
      signals,
      knowledgeProfile: adapter.knowledgeProfile(signals),
    };
  }

  private emptyKnowledgeProfile(): KnowledgeProfile {
    return {
      baseKnowledgeFiles: [],
      ruleFiles: [],
      genericKnowledgeFiles: [],
    };
  }
}
