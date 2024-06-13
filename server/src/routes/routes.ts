import express from "express";
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

  console.log(chalk.blue("1. messages when received: "), typeof messages);

  try {
    const convertedMessages = JSON.parse(messages);

    const model = getModel();
    const aiResponse = await model.invoke(convertedMessages);

    return res.send({
      message: aiResponse.content,
      metadata: aiResponse.response_metadata,
    });
  } catch (error) {
    console.error("Error: ", error);

    res.sendStatus(400).json({
      message: error,
    });
  }
});

router.get("/joke", async (req, res, next) => {
  const model = getModel();

  const result = await model.invoke("Tell me a Javascript joke!");

  return res.send({
    message: result.content,
  });
});

export default router;
