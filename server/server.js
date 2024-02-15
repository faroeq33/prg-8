import { ChatOpenAI } from "@langchain/openai";
import express from "express";

const app = express();
const port = process.env.EXPRESS_PORT || 3000;

app.get("/joke", async (req, res) => {
  const model = new ChatOpenAI({
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenAIApiVersion: process.env.OPENAI_API_VERSION,
    azureOpenAIApiInstanceName: process.env.INSTANCE_NAME,
    azureOpenAIApiDeploymentName: process.env.ENGINE_NAME,
  });

  const joke = await model.invoke("Tell me a Javascript joke!");

  res.json({
    message: joke.content,
  });

  next();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// console.log(joke.content);
