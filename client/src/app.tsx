import "./assets/index.css";
import Home from "./pages/home";
import { QueryProvider } from "./context/query-provider";

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
