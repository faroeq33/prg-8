/**
 * Extracts the last prompt from an array of messages.
 *
 * @param messages - An array of message entries
 * @returns The content of the last prompt as a string
 * @throws {TypeError} Will throw if messages array is empty
 *
 * @example
 * const messages = [["human", "first"], ["ai", "second"]];
 * const lastPrompt = getLastPrompt(messages); // returns "second"
 */
export const getLastPrompt = (messages: []): string => {
  const lastPrompt = messages[messages.length - 1];
  return lastPrompt[1];
};
