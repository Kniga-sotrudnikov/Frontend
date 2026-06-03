import { createPortal } from "react-dom";
import { NotificationContainer } from "./notification-container";
import type { ReactNode } from "react";

type NotificationProviderProps = {
  children: ReactNode;
};

export const NotificationProvider = ({
  children,
}: NotificationProviderProps) => {
  const portalElement = document.getElementById("notification-root");

  return (
    <>
      {children}
      {portalElement && createPortal(<NotificationContainer />, portalElement)}
    </>
  );
};
