import { ContainerNarrow } from "./components/Container";
import { H1 } from "./components/H1";
import "./index.css";

function App() {
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
          <button className="p-3 border border-black rounded-md">
            Verstuur
          </button>
        </form>
      </ContainerNarrow>
    </>
  );
}
export default App;
