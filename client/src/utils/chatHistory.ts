import { Message } from "../message";

function getChatHistory() {
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

export { getChatHistory, saveChatHistory };
