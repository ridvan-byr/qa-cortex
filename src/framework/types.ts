import type { DependencyInfo, TargetFileInfo } from '../types/ReviewContext';

export type FrameworkName =
  | 'playwright'
  | 'selenium'
  | 'cypress'
  | 'webdriverio'
  | 'unknown';

export type FrameworkSignalType =
  | 'locator'
  | 'assertion'
  | 'wait'
  | 'lifecycle'
  | 'structure'
  | 'execution'
  | 'fixture'
  | 'page-object'
  | 'keyword'
  | 'command-chain';

export interface FrameworkSignal {
  type: FrameworkSignalType;
  framework: FrameworkName;
  ruleHints: string[];
  evidence: string;
  location?: {
    file: string;
    line?: number;
  };
  metadata?: Record<string, unknown>;
}

export interface FrameworkContext {
  framework: FrameworkName;
  targetFile: TargetFileInfo;
  metadata?: Record<string, unknown>;
}

export interface KnowledgeProfile {
  baseKnowledgeFiles: string[];
  ruleFiles: string[];
  genericKnowledgeFiles: string[];
}

export interface FrameworkDetectionInput {
  dependencies: DependencyInfo;
  targetFile: TargetFileInfo;
}

export interface FrameworkAdapter {
  name: FrameworkName;
  detect(input: FrameworkDetectionInput): boolean;
  buildContext(input: FrameworkDetectionInput): FrameworkContext;
  buildSignals(context: FrameworkContext): FrameworkSignal[];
  knowledgeProfile(signals: FrameworkSignal[]): KnowledgeProfile;
}

export interface FrameworkAdapterResult {
  adapterName: FrameworkName;
  context: FrameworkContext;
  signals: FrameworkSignal[];
  knowledgeProfile: KnowledgeProfile;
}
