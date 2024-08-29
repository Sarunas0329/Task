import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./Components/Router";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <>
    <AppRouter />
  </>
);
