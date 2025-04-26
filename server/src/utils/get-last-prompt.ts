export const getLastPrompt = (messages: []): string => {
  const lastPrompt = messages[messages.length - 1];
  return lastPrompt[1];
};
