import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./routes/routes";

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

    console.error(myError);
    // Make sure "next" middleware is added, otherwise sendStatus won't be recognized
    res.sendStatus(400).json(myError);
    next();
  });

const port = process.env.EXPRESS_PORT || 3000;

app.listen(port, () => {
  console.log(`Chatbot server is listening on port ${port}`);
});
