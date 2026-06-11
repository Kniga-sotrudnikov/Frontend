import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { setupInterceptors } from "@/app/api/setup-interceptors";
import { router } from "@/app/routes";
import "./styles/index.css";

setupInterceptors();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
