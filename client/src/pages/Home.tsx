import { FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../components/buttons/Button";
import * as api from "../queries/api";
import { ApiResponse, Message } from "../types";
import {
  clearChatHistory,
  getChatHistory,
  saveChatHistory,
} from "@/utils/chatHistory";
import { H1 } from "@/components/typography/H1";
import MetaData from "@/components/misc/MetaData";
import { Chat } from "@/components/chatelements/Chat";

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

  if (messagesMutation.error) {
    return "An error has occurred: " + messagesMutation.error;
  }

  const onSubmitMessage = (event: FormEvent) => {
    event.preventDefault();

    // add human message to messages array
    messages.push(["human", question]);

    // clear the input field
    setQuestion("");

    // console.log(messages);

    // send the question to the server
    messagesMutation.mutate(messages, {
      onSettled(data: ApiResponse) {
        const aiResponseJson = data.message;
        console.log("aiResponseJson", aiResponseJson);

        // add ai message to messages array
        messages.push(["ai", aiResponseJson]);

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
      <H1 className="pb-4 my-8 text-center text-black capitalize">
        AI teaching assistant
      </H1>
      <div className="flex gap-4 justify-center my-8">
        <div className="w-[800px] space-y-4">
          <div className="flex flex-col gap-4 justify-center">
            <Chat messages={messages} className="shadow-md" />
          </div>

          <form onSubmit={onSubmitMessage}>
            <input
              type="text"
              name="question"
              required
              placeholder="Explain the important differences between cohesion and coupling."
              className="p-3 w-full rounded-md border border-gray-200 bg-gray-20 focus-visible:ring-1 focus:ring-offset-0"
              onChange={(event) => setQuestion(event.target.value)}
              value={question}
            />
            <Button disabled={messagesMutation.isPending} type="submit">
              Send
            </Button>
            <Button onClick={clearChat}>Clear chat</Button>
          </form>
        </div>
        <MetaData metadata={messagesMutation?.data?.metadata} />
      </div>

      {/* <ReactQueryDevtools initialIsOpen /> */}
    </>
  );
}
