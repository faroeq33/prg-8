import { ContainerNarrow } from "../components/Container";
import { H1 } from "../components/H1";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import * as api from "../queries/api";
import Button from "../components/Button";
import { FormEvent, useState } from "react";
import { Message } from "../message";

const defaultMessages: Message[] = [
  { role: "system", content: "Pretend you are an expert on plants" },
  { role: "human", content: "What is a plant?" },
];

// let queryCount = 0;
// let renderCount = 0;
export default function Home() {
  // renderCount++;
  const queryClient = useQueryClient();
  const [messages, setMessages] = useState<Message[]>(defaultMessages);
  const [question, setQuestion] = useState("");

  const setChatMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  // Question submission
  const messagesMutation = useMutation({
    mutationFn: api.askQuestion,
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [api.askQuestion.name] }),
  });

  if (messagesMutation.error)
    return "An error has occurred: " + messagesMutation.error;

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    setQuestion(""); // clear the input field

    // queryCount++;

    // add human message to messages array
    const humanMessage: Message = {
      role: "human",
      content: question,
    };

    setChatMessage(humanMessage);

    // update messages in local storage
    // localStorage.setItem("myChatHistory", JSON.stringify(messages));

    // update the messages in the server
    messagesMutation.mutate(messages, {
      onSettled(data) {
        const aiResponseJson = data.message;

        // Save ai response
        setChatMessage(aiResponseJson);
      },
    });
  };
  return (
    <>
      <ContainerNarrow>
        {/* <div className="qcount">query count {queryCount}</div> */}
        {/* <div className="qcount">render Count {renderCount}</div>  */}
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
                className="w-full p-3 borimport { HumanMessage } from 'langchain/chat_models/messages';
der border-gray-200 rounded-md bg-gray-20import { HumanMessage } from 'langchain/chat_models/messages';
 border-lg"
                onChange={(event) => setQuestion(event.target.value)}
                value={question}
              />
            </div>
            <Button disabled={messagesMutation.isPending} type="submit">
              Send
            </Button>
          </div>
        </form>
        <Button
          type="button"
          className="p-4 border-2 border-black "
          onClick={() => localStorage.clear()}
        >
          clear chat
        </Button>

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
