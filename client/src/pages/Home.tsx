import { ContainerNarrow } from "../components/Container";
import { H1 } from "../components/H1";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import * as api from "../queries/api";
import Button from "../components/Button";
import { useState } from "react";

export default function Home() {
  const queryClient = useQueryClient();
  const [question, setQuestion] = useState("");

  // Question submission
  const mutation = useMutation({
    mutationFn: api.askQuestion,
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [api.askQuestion.name] }),
  });

  if (mutation.error) return "An error has occurred: " + mutation.error;
  return (
    <>
      <ContainerNarrow>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setQuestion("");
            console.log("question", question);
            mutation.mutate(question);
          }}
        >
          <div className="grid h-screen gap-4 place-content-center">
            <div className="col-1">
              <H1 className="pb-4 text-center text-black capitalize ">
                AI teaching assistant
              </H1>
              <input
                type="text"
                name="question"
                placeholder="Explain the important differences between cohesion and coupling."
                className="w-full p-3 border border-gray-200 rounded-md bg-gray-200/20 border-lg"
                onChange={(event) => setQuestion(event.target.value)}
                value={question}
              />
            </div>
            <Button disabled={mutation.isPending} type="submit">
              Send
            </Button>
            <div className="self-end col-2">
              <div className="p-4 text-green-300 bg-black rounded-md answer">
                <p>{mutation.data?.message ?? "Ask me a question."}</p>
              </div>
            </div>
          </div>
        </form>
      </ContainerNarrow>
      <ReactQueryDevtools initialIsOpen />
    </>
  );
}
