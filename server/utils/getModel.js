import { ChatOpenAI } from "@langchain/openai";
// import { FakeListChatModel } from "@langchain/core/utils/testing";
import getEnvVars from "../config.js";
import { getModel } from "./getModel";

export function getModel() {
  return new ChatOpenAI(getEnvVars());
}

// export function getModel() {
//   if (process.env.NODE_ENV === "production") {
//     return new ChatOpenAI(getEnvVars());
//   }
//   if (process.env.NODE_ENV === "development") {
//     return new FakeListChatModel({
//       responses: [
//         "Fake response one",
//         "Fake response two",
//         "Fake response three",
//       ],
//       sleep: 1000,
//     });
//   }
//   throw new Error("No model found");
// }
