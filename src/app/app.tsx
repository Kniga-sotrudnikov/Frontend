import { Outlet } from "react-router";

export function App() {
  return (
    <div className="app-layout">
      {/* тут размещается sidebar */}
      <Outlet />
    </div>
  );
}
