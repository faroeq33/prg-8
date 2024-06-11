export type ApiResponse = {
  message: string;
  metadata: Metadata;
};

export type Metadata = {
  tokenUsage: TokenUsage;
  finish_reason: string;
};

export type TokenUsage = {
  completionTokens: number;
  promptTokens: number;
  totalTokens: number;
};

export type HumanMessage = {
  role: "human";
  content: string;
};

export type AIMessage = {
  role: "ai";
  content: string;
};

export type SystemMessage = {
  role: "system";
  content: string;
};

export type Message = HumanMessage | AIMessage | SystemMessage;
