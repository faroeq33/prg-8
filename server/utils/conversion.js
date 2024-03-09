/**
 * Takes json string and converts it to an array of arrays, in order to be usable for language model
 *  */
function convertToMessage(input) {
  const output = [];

  const inputJson = JSON.parse(input);

  inputJson.forEach((item) => {
    if (typeof item === "object") {
      output.push([item.role, item.content]);
    }
  });

  return output;
}

/**
 * Takes an array of arrays and converts it to a json string
 */
function convertMessagetoJson(input) {
  const output = [];

  input.forEach((item) => {
    if (Array.isArray(item) && item.length === 2) {
      output.push({ role: item[0], content: item[1] });
    }
  });

  return JSON.stringify(output);
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
