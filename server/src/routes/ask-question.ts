import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

import { AzureChatOpenAI } from "@langchain/openai";
import { getWeather } from "../get-weather";
import { getLastPrompt } from "../utils/get-last-prompt";
import { searchDocuments } from "./search-documents";
import { FaissStore } from "@langchain/community/vectorstores/faiss";

export async function askQuestion(
  messages: string,
  vectorStore: Promise<FaissStore>
) {
  // Convert JSON String to JSON
  const messagesJson = JSON.parse(messages) as [];

  try {
    const chatModel = new AzureChatOpenAI({ temperature: 0 });

    const lastPrompt = getLastPrompt(messagesJson);
    const roosterContext = await searchDocuments(lastPrompt, await vectorStore);

    const d = new Date(); // today, now
    const dateContext = `Het is vandaag ${d} in dag-maand-jaar`;

    console.log("dateContext: ", dateContext);

    const weatherData = await getWeather();
    const weatherContext = JSON.stringify(weatherData.fivedayForecast);
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
          Datum context: ${dateContext}.
          Rooster context: ${roosterContext}.
          Weer context:  Het weer van de de komende dagen is: ${weatherContext}
        `
      ),
      new MessagesPlaceholder("msgs"),
    ]);

    const aiResponse = await promptTemplate
      .pipe(chatModel)
      .invoke({ msgs: messages });

    return {
      message: aiResponse.content,
      metadata: aiResponse.response_metadata,
    };
  } catch (error) {
    console.error("Error: ", error);
    return {
      message: error,
    };
  }
}
