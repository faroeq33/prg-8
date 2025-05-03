import express from "express";
import { initiateDatabase } from "../init-db";
import { askQuestion } from "./ask-question";

const router = express.Router();

// To save & search documents
export const vectorStore = initiateDatabase();

router.post("/chat", async (req, res) => {
  const { messages } = req.body;

  if (!messages) {
    return res.status(400).json({
      message:
        "There is no messages key in the request body. Please provide a message key.",
    });
  }

  try {
    const aiResponse = await askQuestion(messages, vectorStore);

    return res.send({
      message: aiResponse.message,
      metadata: aiResponse.metadata,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

export default router;
