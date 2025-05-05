/*
This file is used to test api, or other code individually, this isn't meant to be ran in production
*/
// getWeather();

// import { formatDate } from "./utils/format-date";

import { initiateDatabase } from "./init-db";
import { askQuestion } from "./routes/ask-question";

async function runTest() {
  const messages = JSON.stringify([
    ["human", "Zal ik mijn jas aandoen voor de eerstvolgende les?"],
  ]);

  const vectorStore = initiateDatabase();
  console.log("resultaat", await askQuestion(messages, vectorStore));
}
runTest();

// console.log(formatDate());
