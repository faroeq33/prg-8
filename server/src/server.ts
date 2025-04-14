import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./routes/routes";
import chalk from "chalk";

const app = express()
  .use(cors())
  // .options(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(router)
  .use((err: Error, req: Request, res: Response, next: NextFunction) => {
    // Een algemene middleware indien er iets misloopt in de routes

    // get latest error from stack
    const myError = err.stack?.split("\n")[0];

    console.error(chalk.red(myError));

    // Make sure "next" middleware is added, otherwise sendStatus won't be recognized
    // res.sendStatus(400).json(myError);
    next();
  });

const port = process.env.EXPRESS_PORT || 3000;

app.listen(port, () => {
  console.log(
    chalk.italic(
      ` - Chatbot server is listening on port ${chalk.bold.blue(port)} 🚀 - \n`
    )
  );
});
// import { AzureChatOpenAI } from "@langchain/openai";
// const model = new AzureChatOpenAI({
//   temperature: 0.2,
//   verbose: true,
// });
// const testInvoke = async () => {
//   try {
//     console.log("entererd testinvoke");
//     const result = await model.invoke("Tell me a Javascript joke!");
//     console.log(result);
//   } catch (error) {
//     console.log(error);
//   }
// };

// testInvoke();
// const joke = testInvoke();
// console.log(joke);
