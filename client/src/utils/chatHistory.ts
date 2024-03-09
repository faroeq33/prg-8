import { Message } from "../message";
function getChatHistory() {
  const chatHistory = localStorage.getItem("myChatHistory");
  if (chatHistory) {
    return JSON.parse(chatHistory);
  }
  return [
    {
      role: "system",
      content:
        "You're an expert in teaching complicated things simply. Can you help me with that?",
    },
    {
      role: "human",
      content: "Could you introduce yourself?",
    },
  ];
}
function saveChatHistory(messages: Message[]) {
  localStorage.setItem("myChatHistory", JSON.stringify(messages));
}

export { getChatHistory, saveChatHistory };
