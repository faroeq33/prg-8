import { FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "../queries/api";
import { ApiResponse, Message } from "../types";
import {
  getChatHistory,
  saveChatHistory,
  clearChatHistory,
} from "@/utils/chat-history";
import { H1 } from "@/components/typography/heading-one";
import { H2 } from "@/components/typography/heading-two";
import MetaData from "@/components/misc/meta-data";
import { Chat } from "@/components/chatelements/chat";
import LoadingButton from "@/components/buttons/loading-button";

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
    return "An error has occurred: " + messagesMutation.error.message;
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
        AI Studiehulp
      </H1>
      <H2 className="text-center text-gray-800 ">
        Een chatbot die studenten van het hogeschool rotterdam
        <br />
        helpt met vragen over het rooster en het weer.
      </H2>
      <div className="flex justify-center gap-4 my-8">
        <div className="w-[800px] space-y-4">
          <div className="flex flex-col justify-center gap-4">
            <Chat messages={messages} className="shadow-md" />
          </div>

          <form onSubmit={onSubmitMessage}>
            <input
              type="text"
              name="question"
              required
              placeholder="Moet ik voor de volgende les een jas aandoen?"
              className="w-full p-3 border border-gray-200 rounded-md bg-gray-20 focus-visible:ring-1 focus:ring-offset-0"
              onChange={(event) => setQuestion(event.target.value)}
              value={question}
            />
            {/* <Button disabled={true} type="submit"> */}
            <LoadingButton disabled={messagesMutation.isPending} type="submit">
              Send
            </LoadingButton>
            <LoadingButton onClick={clearChat}>Clear chat</LoadingButton>
          </form>
        </div>
        <MetaData metadata={messagesMutation?.data?.metadata} />
      </div>

      {/* <ReactQueryDevtools initialIsOpen /> */}
    </>
  );
}
