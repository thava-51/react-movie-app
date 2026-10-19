import { createRoot } from "react-dom/client";
import HomePage from "./pages/homePage";

const App = () => {
  return (
      <HomePage/>
  );
};

const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);
