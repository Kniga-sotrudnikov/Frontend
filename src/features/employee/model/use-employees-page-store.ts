import { create } from "zustand";
import type { TEmployeeStatus } from "@/entities/employee";
import type { TExpertiseFilterValue } from "@/features/employee/model/types";

interface EmployeesUIState {
  viewType: "grid" | "list";
  statusFilter: TEmployeeStatus[];
  citiesFilter: string[];
  expertiseFilter: TExpertiseFilterValue;
  setViewType: (viewType: "grid" | "list") => void;
  setStatusFilter: (statuses: TEmployeeStatus[]) => void;
  setCitiesFilter: (cities: string[]) => void;
  setExpertiseFilter: (value: TExpertiseFilterValue) => void;
}

export const useEmployeesPageStore = create<EmployeesUIState>((set) => ({
  viewType: "grid",
  statusFilter: [],
  citiesFilter: [],
  expertiseFilter: {},
  setViewType: (viewType) => set({ viewType }),
  setStatusFilter: (statusFilter) => set({ statusFilter }),
  setCitiesFilter: (citiesFilter) => set({ citiesFilter }),
  setExpertiseFilter: (expertiseFilter) => set({ expertiseFilter }),
}));
