import { Outlet } from "react-router";
import { useState } from "react";
import { Calendar } from "../shared/ui/calendar";

export function App() {
  const [date, setDate] = useState();
  return (
    <div className="app-layout">
      {/* тут размещается sidebar */}
      <Calendar 
        mode="single"
        selected={date}
        onSelect={setDate}
      />
      <Outlet />
    </div>
  );
}
