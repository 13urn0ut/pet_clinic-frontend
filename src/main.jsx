import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";

import UserContextProvider from "./contexts/UserContextProvider.jsx";
import AppointmentContextProvider from "./contexts/AppointmentContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <AppointmentContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppointmentContextProvider>
    </UserContextProvider>
  </StrictMode>
);
