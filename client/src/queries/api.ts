import axios from "axios";
import { Message } from "@/types";

function askQuestion(messages: Message[]) {
  console.log(messages);
  const config = {
    method: "post",
    url: "http://localhost:8000/chat",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
    },
    data: {
      messages: JSON.stringify(messages),
    },
  };
  return axios(config).then((res) => {
    return res.data;
  });
}
export { askQuestion };
