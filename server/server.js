import { ChatOpenAI } from "@langchain/openai";
import express from "express";
import cors from "cors";

const app = express()
  .options(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use((err, req, res, next) => {
    // Een algemene middleware indien er iets misloopt in de routes

    // get latest error from stack
    const myError = err.stack.split("\n")[0];

    // console.error(myError);
    res.status(400).json(myError);
  });

const port = process.env.EXPRESS_PORT || 3000;

app.get("/joke", async (res) => {
  const model = new ChatOpenAI({
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenAIApiVersion: process.env.OPENAI_API_VERSION,
    azureOpenAIApiInstanceName: process.env.INSTANCE_NAME,
    azureOpenAIApiDeploymentName: process.env.ENGINE_NAME,
  });

  const joke = await model.invoke("Tell me a Javascript joke!");

  return res.json({
    message: joke.content,
  });
});

app.post("/chat", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({
      message:
        "There is no prompt key in the request body. Please provide a prompt.",
    });
  }

  const model = new ChatOpenAI({
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenAIApiVersion: process.env.OPENAI_API_VERSION,
    azureOpenAIApiInstanceName: process.env.INSTANCE_NAME,
    azureOpenAIApiDeploymentName: process.env.ENGINE_NAME,
  });

  const joke = await model.invoke(prompt);

  return res.json({
    message: joke.content,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// console.log(joke.content);
