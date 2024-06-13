import { ChatOpenAI } from "@langchain/openai";
// import { FakeListChatModel } from "@langchain/core/utils/testing";

export function getModel() {
  return new ChatOpenAI({
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenAIApiVersion: process.env.OPENAI_API_VERSION,
    azureOpenAIApiInstanceName: process.env.INSTANCE_NAME,
    azureOpenAIApiDeploymentName: process.env.ENGINE_NAME,
    maxRetries: 5,
  });
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
