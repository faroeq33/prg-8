import express from "express";
import { getModel } from "../utils/getModel";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { AIMessage, HumanMessage } from "@langchain/core/messages";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("This is a test route.");
});

router.post("/chat", async (req, res) => {
  const { messages } = req.body;

  if (!messages) {
    return res.status(400).json({
      message:
        "There is no messages key in the request body. Please provide a messages key.",
    });
  }

  console.log("_Messages when received: ", messages);

  try {
    const convertedMessages: (HumanMessage | AIMessage)[] = JSON.parse(
      messages
    ).map(([role, content]: [string, string]) => {
      if (role === "human") {
        return new HumanMessage(content);
      } else if (role === "ai") {
        return new AIMessage(content);
      } else {
        throw new Error(`Unknown role: ${role}`);
      }
    });

    console.log("_na JSON parse", convertedMessages);

    const promptTemplate = ChatPromptTemplate.fromMessages([
      new AIMessage(
        "You are a helpful assistant, explain everything like i'm 12"
      ),
      new MessagesPlaceholder("msgs"),
    ]);

    const model = getModel();

    const aiResponse = await promptTemplate
      .pipe(model)
      .invoke({ msgs: convertedMessages });

    return res.send({
      message: aiResponse.content,
      metadata: aiResponse.response_metadata,
    });
  } catch (error) {
    console.error("Error: ", error);

    res.status(400).json({
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
