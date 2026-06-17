import { create } from "zustand";
import type { EmployeeData } from "@/entities/employee";

interface EmployeeModalStore {
  selectedEmployee: EmployeeData | null;
  openEmployeeModal: (employee: EmployeeData) => void;
  closeEmployeeModal: () => void;
}

export const useEmployeeModalStore = create<EmployeeModalStore>((set) => ({
  selectedEmployee: null,

  openEmployeeModal: (employee) => {
    const url = new URL(window.location.href);
    url.searchParams.set("employee", String(employee.id));
    window.history.pushState({}, "", url.toString());
    set({ selectedEmployee: employee });
  },

  closeEmployeeModal: () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("employee");
    window.history.pushState({}, "", url.toString());
    set({ selectedEmployee: null });
  },
}));
