import { createRoot } from "react-dom/client";
import AppRouter from "./Components/Router";
import "./index.css";
import NotificationProvider from "./Components/Notification";

createRoot(document.getElementById("root")).render(
  <NotificationProvider>
    <AppRouter />
  </NotificationProvider>
);
