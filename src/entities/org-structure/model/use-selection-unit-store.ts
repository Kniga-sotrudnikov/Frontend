import { create } from "zustand";
import type { SelectedOrgUnit } from "./types";

interface OrgSelectionStore {
  selectedUnit: SelectedOrgUnit | null;
  setSelectedUnit: (unit: SelectedOrgUnit | null) => void;
}

export const useSelectionUnitStore = create<OrgSelectionStore>((set) => ({
  selectedUnit: null,
  setSelectedUnit: (selectedUnit) => set({ selectedUnit }),
}));