import express from "express";
import cors from "cors";
import { getModel } from "./utils/getModel.js";

// console.log(process.env.NODE_ENV);
const app = express()
  .use(cors())
  .options(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use((err, req, res, next) => {
    // Een algemene middleware indien er iets misloopt in de routes

    // get latest error from stack
    const myError = err.stack.split("\n")[0];

    // console.error(myError);
    res.status(400).json(myError);
  });

const port = process.env.EXPRESS_PORT || 3000;

app.get("/joke", async (req, res) => {
  const model = getModel();

  const result = await model.invoke("Tell me a Javascript joke!");

  return res.send({
    message: result.content,
  });
});

app.post("/chat", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({
      message:
        "There is no prompt key in the request body. Please provide a prompt.",
    });
  }

  const model = getModel();

  const modelResponse = await model.invoke(prompt);

  return res.send({
    message: modelResponse.content,
  });
});

app.listen(port, () => {
  console.log(`Chatbot server is listening on port ${port}`);
});
