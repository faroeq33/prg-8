import axios from "axios";
// used as queryfunction in useQuery

export function getJoke() {
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
