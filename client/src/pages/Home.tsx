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
          <div className="grid h-screen grid-cols-2 gap-4 place-content-center">
            <div className="col-1">
              <H1 className="pb-4 text-center text-black capitalize ">
                AI teaching assistant
              </H1>
              <input
                type="text"
                name="question"
                placeholder="Stel je vraag..."
                className="w-9/12 p-3 border border-black rounded-md border-lg"
                onChange={(event) => setQuestion(event.target.value)}
                value={question}
              />
              <Button disabled={mutation.isPending} type="submit">
                Verstuur
              </Button>
            </div>

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
