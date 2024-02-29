import { ContainerNarrow } from "./components/Container";
import { H1 } from "./components/H1";
import "./index.css";

function App() {
  return (
    <>
      <ContainerNarrow className="">
        <H1 className="text-center text-black">Ai teaching assistent</H1>
        <form>
          <div className="space-y-6">
            <input
              className="border black border-lg"
              type="text"
              placeholder="prompt"
            />
            <button className="p-3 border border-black rounded-md">
              verstuur
            </button>
          </div>
        </form>
      </ContainerNarrow>
    </>
  );
}
export default App;
