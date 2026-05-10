import { Outlet } from "react-router";
import { Sidebar } from "@/widgets/sidebar";
import { Navbar, orgTree } from "@/widgets/navbar";

export function App() {

  return (
    <div className="app-layout flex min-h-screen">
      <Sidebar />
      <main className="flex-1 px-8 pt-8">
        <Navbar unitsList={orgTree} />
        {/* <Outlet /> */}
      </main>
    </div>
  );
}
