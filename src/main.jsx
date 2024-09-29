import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ShoppingCartProvider from "./context/index.jsx"; // Correct capitalization

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ShoppingCartProvider> {/* Correct capitalization */}
        <App />
      </ShoppingCartProvider>
    </BrowserRouter>
  </StrictMode>
);
