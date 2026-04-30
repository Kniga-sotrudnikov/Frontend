import { Outlet } from "react-router";
import { Sidebar } from "@/widgets/sidebar";

export function App() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
