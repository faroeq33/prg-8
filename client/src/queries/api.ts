import axios from "axios";
// used as queryfunction in useQuery

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

function askQuestion(question: string) {
  const config = {
    method: "post",
    url: "http://localhost:8000/chat",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
    },
    data: {
      question,
    },
  };
  return axios(config).then((res) => res.data);
}

export { getJoke, askQuestion };
