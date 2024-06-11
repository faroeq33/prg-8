import express from "express";
import { convertToMessage } from "../utils/conversion";
import axios from "axios";
import { SystemMessage } from "@langchain/core/messages";
import { getModel } from "../utils/getModel";
import chalk from "chalk";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("This is a test route.");
});

router.post("/chat", async (req, res) => {
  const { messages } = req.body;

  if (!messages) {
    return res.sendStatus(400).json({
      message:
        "There is no messages key in the request body. Please provide a messages key.",
    });
  }

  // if json is not valid, return 400 status with messages
  try {
    JSON.parse(messages);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Invalid JSON format in the messages key.",
    });
  }

  console.log(chalk.blue("1. messages when received: "), messages);

  const convertedMessages = convertToMessage(messages);

  try {
    // console.log("3. Retreiving external call");

    // Doe een externe API call naar een gratis api en voeg het toe aan de history van de messages
    // const response = await axios.get(
    //   "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single"
    // );

    // const joke = response.data.joke;
    // const messagesWithJoke = [...convertedMessages, new SystemMessage(joke)];

    const model = getModel();
    const aiResponse = await model.invoke(convertedMessages);

    // const messagesResponse = convertMessagetoJson(aiResponse);

    return res.send({
      message: aiResponse.content,
    });
  } catch (error) {
    console.error("Failed to fetch joke:", error);

    res.sendStatus(400).json({
      message: error,
    });
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
