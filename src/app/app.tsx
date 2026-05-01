import { Outlet } from "react-router";
import { NotificationProvider } from "@/shared/ui/notification/notification-provider";

export function App() {
  return (
    <div className="app-layout">
      {/* тут размещается sidebar */}
      <Outlet />
      <NotificationProvider />
    </div>
  );
}
