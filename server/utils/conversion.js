import {
  SystemMessage,
  HumanMessage,
  AIMessage,
} from "@langchain/core/messages";

/**
 * Takes json string and converts it to an array of arrays, in order to be usable for language model
 *  */
function convertToMessage(input) {
  const output = [];

  const inputJson = JSON.parse(input);

  inputJson.forEach((item) => {
    if (typeof item !== "object") {
      throw new Error("Input is not a valid json string");
    }

    if (item.role === "system") {
      output.push(new SystemMessage(item.content));
    }

    if (item.role === "human") {
      output.push(new HumanMessage(item.content));
    }

    if (item.role === "ai") {
      output.push(new AIMessage(item.content));
    }
  });

  return output;
}

/**
 * Takes an array of arrays and converts it to a json string
 */
function convertMessagetoJson(input) {
  return { role: "ai", content: input.content };
}

export { convertToMessage, convertMessagetoJson };

// You can test the function by running the following code:
/*
const inputJson = [
  { role: "system", content: "Pretend you are an expert on plants" },
  { role: "human", content: "What is a plant?" },
];

const outputArray = convertToJsonArray(inputJson);
console.log(outputArray);

*/
