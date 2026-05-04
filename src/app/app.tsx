import { Outlet } from "react-router";
import { NotificationProvider } from "@/shared/ui/notification/notification-provider";
import { Sidebar } from "@/widgets/sidebar";

export function App() {
  return (
    <div className="app-layout flex min-h-screen">
      <Sidebar />
      <main className="flex-1">
        <Outlet />
      </main>
      <NotificationProvider />
    </div>
  );
}
