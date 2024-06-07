import axios from "axios";
import { Message } from "../components/chatelements/message";

function getJoke() {
  const config = {
    method: "get",
    url: "http://localhost:8000/joke",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
    },
  };
  return axios(config).then((res) => res.data);
}

function askQuestion(messages: Message[]) {
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
export { getJoke, askQuestion };
