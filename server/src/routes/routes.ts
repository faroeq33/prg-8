import express, { Request, Response } from "express";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

import { AzureChatOpenAI, AzureOpenAIEmbeddings } from "@langchain/openai";
import { createVectorstore } from "../create-vector-store";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { getWeather } from "../get-weather";

const router = express.Router();

// To save documents
let vectorStore: null | FaissStore = null;

const initiateDatabase = async () => {
  const embeddings = new AzureOpenAIEmbeddings({
    azureOpenAIApiEmbeddingsDeploymentName:
      process.env.AZURE_EMBEDDING_DEPLOYMENT_NAME,
  });
  vectorStore = await createVectorstore(embeddings);
};

initiateDatabase();

router.post("/chat", async (req: Request, res: Response) => {
  const { messages } = req.body;

  if (!messages) {
    return res.status(400).json({
      message:
        "There is no messages key in the request body. Please provide a message key.",
    });
  }

  const convertedMsgs = JSON.parse(messages) as [];

  try {
    const model = new AzureChatOpenAI({ temperature: 1 });

    // Needed for vectorstore
    if (!vectorStore) {
      throw new Error("Vector store not initialized");
    }

    /*
    const relevantDocs = await vectorStore.similaritySearch(
      "Wat staat er op mijn rooster?",
      3
    );
    const roosterContext = relevantDocs
      .map((doc) => doc.pageContent)
      .join("\n\n");
    */

    const d = new Date(); // today, now
    const dateContext = `Het is vandaag ${d} in dag-maand-jaar`;

    console.log("dateContext: ", dateContext);
    const roosterContext =
      "Geen rooster beschikbaar, het rooster moet nog gemaakt worden";

    const weatherData = await getWeather();
    const weatherContext = weatherData;
    console.log(weatherContext);

    // const weatherContext = `Geef mij kledingadvies voor het weer met een temperatuur van ${weatherData.todaysTemp}`;

    // console.log("YYYY-MM-DD", d.toISOString().slice(0, 10));

    // console.log("D.M.YYYY", d.toLocaleDateString("nl-NL"));

    const promptTemplate = ChatPromptTemplate.fromMessages([
      new SystemMessage(
        "Use the following context to answer the user's question. Only use information from the context. Antwoord altijd in het nederlands"
      ),
      new HumanMessage(
        `
        Context:
          ${dateContext}.
          Het rooster: ${roosterContext}.
          Weer:  Het weer van de de komende dagen is: ${weatherContext}
        `
      ),
      new MessagesPlaceholder("msgs"),
    ]);

    const aiResponse = await promptTemplate
      .pipe(model)
      .invoke({ msgs: convertedMsgs });

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

export default router;
