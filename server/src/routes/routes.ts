import express from "express";
import { getModel } from "../utils/getModel";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import {
  AIMessage,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages";
import getTodoList from "../utils/todolist";

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

    // Check if the messages contain the word "takenlijst"
    let todos = "geen lijst gevonden";

    if (messages.includes("takenlijst")) {
      todos = (await getTodoList()) || "- Geen taken gevonden";
    }

    const promptTemplate = ChatPromptTemplate.fromMessages([
      new SystemMessage(
        `Je bent een behulpzame studiehulp die mij helpt mijn taken overzichtelijk te houden. Als het woord 'takenlijst' in de chat voorkomt, help je mij door de takenlijst te tonen die hierna volgt: ${todos}. Als er wordt gevraagd naar de takenlijst, geef je de meest recente takenlijst terug.`
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

// Nieuwe route voor woordenboekfunctionaliteit

export default router;
