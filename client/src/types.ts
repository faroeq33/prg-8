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

export type HumanMessage = ["human", string];

export type AIMessage = ["ai", string];

export type SystemMessage = ["system", string];

export type Message = HumanMessage | AIMessage | SystemMessage;
