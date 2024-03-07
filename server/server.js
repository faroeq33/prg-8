import express from "express";
import cors from "cors";
import { getModel } from "./utils/getModel.js";
import getEnvVars from "./config.js";
import {
  AIMessage,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages";
import { ChatOpenAI } from "@langchain/openai";

// console.log(process.env.NODE_ENV);
const app = express()
  .use(cors())
  .options(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use((err, req, res, next) => {
    // Een algemene middleware indien er iets misloopt in de routes

    // get latest error from stack
    const myError = err.stack.split("\n")[0];

    console.error(myError);
    res.status(400).json(myError);
  });

const port = process.env.EXPRESS_PORT || 3000;

app.get("/joke", async (req, res) => {
  const model = getModel();

  const result = await model.invoke("Tell me a Javascript joke!");

  return res.send({
    message: result.content,
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

  const model = new ChatOpenAI(getEnvVars());

  // eerste ding
  let messages = [
    new SystemMessage(
      "Take the role of an expert of learing science, and explain everything like I'm twelve"
    ),
    new HumanMessage("My favourite color is blue."),
  ];

  const pastMessages = await model.invoke(messages);

  // tweede ding
  messages.push(new AIMessage(pastMessages.content), new HumanMessage(prompt));

  const chat2 = await model.invoke(messages);

  return res.send({
    message: chat2.content,
  });
});

app.listen(port, () => {
  console.log(`Chatbot server is listening on port ${port}`);
});
