import { ContainerNarrow } from "../components/Container";
import { H1 } from "../components/H1";
import { useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getJoke } from "../queries/getJoke";
import Button from "../components/Button";

export default function Home() {
  const { isPending, error, data } = useQuery({
    queryKey: ["getJoke"],
    queryFn: getJoke,
  });

  if (error) return "An error has occurred: " + error;

  return (
    <>
      <ContainerNarrow>
        <form className="grid h-screen space-y-4 place-content-center">
          <H1 className="text-center text-black capitalize ">
            AI teaching assistant
          </H1>
          <input
            className="p-3 border border-black rounded-md border-lg "
            type="text"
            placeholder="Stel je vraag..."
          />
          <Button disabled={isPending}>Verstuur</Button>
          <div className="p-4 text-green-300 bg-black rounded-md answer">
            <p>{data?.message}</p>
          </div>
        </form>
      </ContainerNarrow>
      <ReactQueryDevtools initialIsOpen />
    </>
  );
}
