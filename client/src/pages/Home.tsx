import { FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Button from "../components/buttons/Button";
import { ContainerNarrow } from "../components/layouts/Container";
import { Message } from "../components/chatelements/message";
import * as api from "../queries/api";
import {
  clearChatHistory,
  getChatHistory,
  saveChatHistory,
} from "@/utils/chatHistory";
import { H1 } from "@/components/typography/H1";

const defaultMessages: Message[] = getChatHistory();

export default function Home() {
  // Allows us to use queries and mutations
  const queryClient = useQueryClient();

  // messages is used to store the chat history
  const [messages, setMessages] = useState<Message[]>(defaultMessages);

  // question is used to set the value of the input field
  const [question, setQuestion] = useState("");

  // a mutation to send a question to the server
  const messagesMutation = useMutation({
    mutationFn: api.askQuestion,
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [api.askQuestion.name] }),
  });

  if (messagesMutation.error)
    return "An error has occurred: " + messagesMutation.error;

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    // clear the input field
    setQuestion("");

    // add human message to messages array
    messages.push({
      role: "human",
      content: question,
    });

    // send the question to the server
    messagesMutation.mutate(messages, {
      onSettled(data) {
        // Save ai response
        const aiResponseJson = data.message as Message;
        // console.log("aiResponseJson", aiResponseJson);

        messages.push(aiResponseJson);

        // update messages in local storage
        saveChatHistory(messages);
      },
    });
  };

  const clearChat = () => {
    clearChatHistory();
    const pastMessages = getChatHistory();
    console.log(pastMessages);

    setMessages([]);
  };

  return (
    <>
      <ContainerNarrow>
        <H1 className="pb-4 text-center text-black capitalize ">
          AI teaching assistant
        </H1>
        <Chat messages={messages} />
        <form onSubmit={onSubmit}>
          <div className="">
            <div className="col-1">
              <input
                type="text"
                name="question"
                required
                placeholder="Explain the important differences between cohesion and coupling."
                className="w-full p-3 border border-gray-200 rounded-md bg-gray-20 focus-visible:ring-1 focus:ring-offset-0 "
                onChange={(event) => setQuestion(event.target.value)}
                value={question}
              />
            </div>
            <Button disabled={messagesMutation.isPending} type="submit">
              Send
            </Button>
          </div>
        </form>
        <Button onClick={clearChat}>Clear chat</Button>

        {/* <pre>messages: {JSON.stringify(messages, null, 2)}</pre> */}
        {/* <pre> messagesMutation: {JSON.stringify(messagesMutation?.data, null, 2)} </pre> */}
      </ContainerNarrow>
      <ReactQueryDevtools initialIsOpen />
    </>
  );
}
function getIcon(role: string) {
  switch (role) {
    case "human":
      return "👤";
    case "ai":
      return "🤖";
    case "system":
      return "🔊";
    default:
      return "🔊";
  }
}
function Chat(props: { messages: Message[] }) {
  if (!props.messages) return null;
  return (
    <>
      <div className="self-end col-2">
        <div className="bg-white rounded-md answer">
          <div>
            {props.messages.map((message, index) => {
              return (
                <div
                  key={index}
                  className={`p-4 odd:bg-gray-200 ${
                    message.role === "human" ? "text-right" : "text-left"
                  }`}
                >
                  <span className="font-bold capitalize">
                    {getIcon(message.role)} {message.role}
                  </span>
                  : <span>{message.content}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
