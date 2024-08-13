import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AppJSON from "./AppJSON_Only.jsx";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* usar <App> para buscar con IA */}
    <App />
    {/* <AppJSON /> */}
    {/* usar <AppJSON> para buscar con el JSON */}
  </React.StrictMode>
);
