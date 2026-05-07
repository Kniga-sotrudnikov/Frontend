import { Outlet } from "react-router";
import { NotificationProvider } from "@/shared/ui/notification/notification-provider";

export function ProvidersLayout() {
  return (
    <>
      <Outlet />
      <NotificationProvider />
    </>
  );
}
