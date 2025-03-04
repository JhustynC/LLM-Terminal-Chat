export interface Gemini20FlashReponse {
  candidates:    Candidate[];
  usageMetadata: UsageMetadata;
  modelVersion:  ModelVersion;
}

export interface Candidate {
  content:           Content;
  citationMetadata?: CitationMetadata;
  finishReason?:     string;
}

export interface CitationMetadata {
  citationSources: CitationSource[];
}

export interface CitationSource {
  startIndex: number;
  endIndex:   number;
  uri:        string;
}

export interface Content {
  parts: Part[];
  role:  Role;
}

export interface Part {
  text: string;
}

export enum Role {
  Model = "model",
}

export enum ModelVersion {
  Gemini20Flash = "gemini-2.0-flash",
}

export interface UsageMetadata {
  promptTokenCount:         number;
  totalTokenCount:          number;
  candidatesTokenCount?:    number;
  promptTokensDetails?:     TokensDetail[];
  candidatesTokensDetails?: TokensDetail[];
}

export interface TokensDetail {
  modality:   string;
  tokenCount: number;
}
