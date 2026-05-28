import { create } from "zustand";
import type { TEmployeeStatus } from "@/entities/employee";

interface EmployeesUIState {
  viewType: "grid" | "list";
  statusFilter: TEmployeeStatus[];
  setViewType: (viewType: "grid" | "list") => void;
  setStatusFilter: (statuses: TEmployeeStatus[]) => void;
}

export const useEmployeesUIStore = create<EmployeesUIState>((set) => ({
  viewType: "grid",
  statusFilter: [],
  setViewType: (viewType) => set({ viewType }),
  setStatusFilter: (statusFilter) => set({ statusFilter }),
}));
