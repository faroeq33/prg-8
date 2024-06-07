declare type HumanMessage = {
  role: "human";
  content: string;
};

declare type AIMessage = {
  role: "ai";
  content: string;
};

declare type SystemMessage = {
  role: "system";
  content: string;
};
declare type Message = HumanMessage | AIMessage | SystemMessage;

export type { Message, HumanMessage, AIMessage, SystemMessage };
