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
import { formatDate } from "../utils/format-date";

export async function askQuestion(
  messages: string,
  vectorStore: Promise<FaissStore>
) {
  // Convert JSON String to JSON
  const messagesJson = JSON.parse(messages) as [];

  try {
    // Prepare prompt with date
    const todaysDate = formatDate();
    const dateContext = `Het is vandaag ${todaysDate}`; // bv: maandag, 5 mei

    // Gets relevant schedule context, using the last prompt
    const lastPrompt = getLastPrompt(messagesJson);
    const roosterContext = await searchDocuments(lastPrompt, await vectorStore);

    // Gets relevant weather context
    const weatherData = await getWeather();
    const weatherContext = JSON.stringify(weatherData.fivedayForecast);
    console.log(weatherContext);

    // Prompts
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

    const chatModel = new AzureChatOpenAI({ temperature: 0 });

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
