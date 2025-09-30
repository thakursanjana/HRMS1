import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DashboardProvider } from "./pages/context/DashboardContext"; // ✅ yahan se import karo

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DashboardProvider>
      <App />
    </DashboardProvider>
  </React.StrictMode>
);
