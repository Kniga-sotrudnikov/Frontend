import { Outlet } from "react-router";
import { NotificationProvider } from "@/shared/ui/notification";
import { QueryProvider } from "@/app/providers/query-provider";

export function ProvidersLayout() {
  return (
    <NotificationProvider>
      <QueryProvider>
        <Outlet />
      </QueryProvider>
    </NotificationProvider>
  );
}
