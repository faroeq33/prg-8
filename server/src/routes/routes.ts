import express from "express";
import { convertToMessage } from "../utils/conversion";
import axios from "axios";
import { SystemMessage } from "@langchain/core/messages";
import { getModel } from "../utils/getModel";
import chalk from "chalk";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Hello from my route! This is a test route. testing");
});

router.post("/chat", async (req, res) => {
  const { messages } = req.body;

  if (!messages) {
    return res.sendStatus(400).json({
      message:
        "There is no messages key in the request body. Please provide a messages key.",
    });
  }

  // console.log("1. messages when received: ", messages);
  const convertedMessages = convertToMessage(messages);

  // console.log("2. messages when converted: ", convertedMessages);

  // Doe een externe API call naar een gratis api en voeg het toe aan de history van de messages
  try {
    // console.log("3. Retreiving external call");

    const response = await axios.get(
      "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single"
    );

    const joke = response.data.joke;
    const messagesWithJoke = [...convertedMessages, new SystemMessage(joke)];

    const model = getModel();
    const aiResponse = await model.invoke(messagesWithJoke);

    // const messagesResponse = convertMessagetoJson(aiResponse);
    console.log(
      chalk.bgBlueBright("4. my converted ai response: "),
      aiResponse
    );

    return res.send({
      message: "test",
    });
  } catch (error) {
    console.error("Failed to fetch joke:", error);
  }
  // https://v2.jokeapi.dev/joke/Programming?type=single
});

router.get("/joke", async (req, res, next) => {
  const model = getModel();

  const result = await model.invoke("Tell me a Javascript joke!");

  return res.send({
    message: result.content,
  });
});

export default router;
