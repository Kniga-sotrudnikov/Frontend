import { createPortal } from "react-dom";
import { NotificationContainer } from "./notification-container";

export const NotificationProvider = () => {
  const portalElement = document.getElementById("notification-root");

  if (!portalElement) return null;

  return createPortal(<NotificationContainer />, portalElement);
};
