import express, { Request, Response } from "express";
// import { getModel } from "../utils/getModel";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

import { AzureChatOpenAI, AzureOpenAIEmbeddings } from "@langchain/openai";
import { createVectorstore } from "../create-vector-store";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { getLastPrompt } from "../utils/get-last-prompt";
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

    // Needed for vecorstore
    if (!vectorStore) {
      throw new Error("Vector store not initialized");
    }
    // const lastPrompt = getLastPrompt(convertedMsgs);

    const relevantDocs = await vectorStore.similaritySearch(
      "Wat staat er op mijn rooster?",
      3
    );
    const roosterContext = relevantDocs
      .map((doc) => doc.pageContent)
      .join("\n\n");

    // const weatherdata = await response.json();
    const weatherData = await getWeather();

    const weatherContext = `Geef mij kledingadvies voor het weer met een temperatuur van ${weatherData.todaysTemp}`;

    const d = new Date(); // today, now

    // Timezone zero UTC offset
    console.log(d.toISOString().slice(0, 10)); // YYYY-MM-DD

    // Timezone of User Agent
    console.log(d.toLocaleDateString("nl-NL")); // D.M.YYYY
    const dateContext = `Het is vandaag ${d} in dag-maand-jaar`;
    console.log("dateContext: ", dateContext);

    const promptTemplate = ChatPromptTemplate.fromMessages([
      new SystemMessage(
        "Use the following context to answer the user's question. Only use information from the context. Antwoord altijd in het nederlands"
      ),
      new HumanMessage(
        `Context:${dateContext}. Het rooster: ${roosterContext}. Weer:  Het weer van de de komende 5 dagen is: ${JSON.stringify(
          weatherData.fivedayForecast
        )} `
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
