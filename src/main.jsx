import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";
import { ErrorBoundary } from "react-error-boundary";
import UserContextProvider from "./contexts/UserContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary fallback={<h1>Something went wrong</h1>}>
      <UserContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserContextProvider>
    </ErrorBoundary>
  </StrictMode>
);
