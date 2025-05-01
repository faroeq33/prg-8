import { Message } from "@/types";

function getChatHistory(): Message[] {
  const chatHistory = localStorage.getItem("myChatHistory");
  // console.log("chatHistory", chatHistory);

  if (chatHistory) {
    return JSON.parse(chatHistory);
  }
  return [];
}
function saveChatHistory(messages: Message[]) {
  localStorage.setItem("myChatHistory", JSON.stringify(messages));
}

function clearChatHistory() {
  localStorage.clear();
}

export { getChatHistory, saveChatHistory, clearChatHistory };
