import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { router } from "./routes/router";
import "./styles/index.css";

const notificationRoot = document.createElement("div");
notificationRoot.id = "notification-root";
document.body.appendChild(notificationRoot);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
