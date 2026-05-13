import { Outlet } from "react-router";
import { Sidebar } from "@/widgets/sidebar";

export function App() {

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}