import { FakeListChatModel } from "@langchain/core/utils/testing";
import { ChatOpenAI } from "@langchain/openai";

const envVars = {
  azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
  azureOpenAIApiVersion: process.env.OPENAI_API_VERSION,
  azureOpenAIApiInstanceName: process.env.INSTANCE_NAME,
  azureOpenAIApiDeploymentName: process.env.ENGINE_NAME,
};

export function getModel() {
  if (process.env.NODE_ENV === "production") {
    return new ChatOpenAI(envVars);
  }
  if (process.env.NODE_ENV === "development") {
    return new FakeListChatModel({
      responses: [
        "Fake response one",
        "Fake response two",
        "Fake response three",
      ],
    });
  }
  throw new Error("No model found");
}
