import { AzureChatOpenAI } from "@langchain/openai";
// import { FakeListChatModel } from "@langchain/core/utils/testing";

export function getModel(
  options = {
    temperature: 0.2,
    verbose: true,
    maxRetries: 5,
  }
) {
  return new AzureChatOpenAI(options);
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
//   throw new Error("No model found";
// }
