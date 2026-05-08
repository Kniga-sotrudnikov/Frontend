import { Outlet } from "react-router";
import { Sidebar } from "@/widgets/sidebar";

export function App() {

  return (
    <div className="app-layout flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
