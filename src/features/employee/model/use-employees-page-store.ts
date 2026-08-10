import { create } from "zustand";
import type { TEmployeeStatus } from "@/entities/employee";

interface EmployeesUIState {
  viewType: "grid" | "list";
  statusFilter: TEmployeeStatus[];
  citiesFilter: string[];
  /** Выбранные в фильтре «С чем обратиться» ID тегов (строками) */
  expertiseFilter: string[];
  searchQuery: string;
  setViewType: (viewType: "grid" | "list") => void;
  setStatusFilter: (statuses: TEmployeeStatus[]) => void;
  setCitiesFilter: (cities: string[]) => void;
  setExpertiseFilter: (value: string[]) => void;
  setSearchQuery: (query: string) => void;
}

export const useEmployeesPageStore = create<EmployeesUIState>((set) => ({
  viewType: "grid",
  statusFilter: [],
  citiesFilter: [],
  expertiseFilter: [],
  searchQuery: "",
  setViewType: (viewType) => set({ viewType }),
  setStatusFilter: (statusFilter) => set({ statusFilter }),
  setCitiesFilter: (citiesFilter) => set({ citiesFilter }),
  setExpertiseFilter: (expertiseFilter) => set({ expertiseFilter }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));
