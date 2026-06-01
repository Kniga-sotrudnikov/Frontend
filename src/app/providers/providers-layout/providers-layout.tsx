import { Outlet } from "react-router";
import { NotificationProvider } from "@/shared/ui/notification/notification-provider";
import { QueryProvider } from "../query-provider/query-provider";

export function ProvidersLayout() {
  return (
    <QueryProvider>
      <Outlet />
      <NotificationProvider />
    </QueryProvider>
  );
}
