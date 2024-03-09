import express from "express";
import cors from "cors";
import { getModel } from "./utils/getModel.js";
import { convertToMessage, convertMessagetoJson } from "./utils/conversion.js";

const app = express()
  .use(cors())
  .options(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use((err, req, res, next) => {
    // Een algemene middleware indien er iets misloopt in de routes

    // get latest error from stack
    const myError = err.stack.split("\n")[0];

    console.error(myError);
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
  const { messages } = req.body;

  // console.log(JSON.parse(messages));
  if (!messages) {
    return res.status(400).json({
      message:
        "There is no messages key in the request body. Please provide a messages key.",
    });
  }

  const model = getModel();

  // convert json to usable messages for language model
  const convertedMessages = convertToMessage(messages);

  const aiResponse = await model.invoke(convertedMessages);

  // console.log(aiResponse);
  // convert messages back to json
  const messagesResponse = convertMessagetoJson(aiResponse);
  console.log(messagesResponse);

  return res.send({
    message: messagesResponse,
  });
});

app.listen(port, () => {
  console.log(`Chatbot server is listening on port ${port}`);
});
