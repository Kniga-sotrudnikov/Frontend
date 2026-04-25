import { Outlet } from "react-router";
import { useState } from "react";
import { Calendar } from "@ui/calendar";

export function App() {
   const [date, setDate] = useState<Date | undefined>(new Date())
  return (
    <div className="app-layout">
      <Calendar 
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-lg border"
      />
      {/* тут размещается sidebar */}
      <Outlet />
    </div>
  );
}
