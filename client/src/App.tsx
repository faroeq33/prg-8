import "./assets/index.css";
import Home from "./pages/Home";
import { QueryProvider } from "./context/QueryProvider";

function App() {
  return (
    <>
      <QueryProvider>
        <Home />
      </QueryProvider>
    </>
  );
}
export default App;
