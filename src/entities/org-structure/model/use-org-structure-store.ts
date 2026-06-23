import { create } from "zustand";
import type { OrgUnit } from "./types";
import type { OrgItemType } from "../ui/org-item";
import { mockTree, mockDirections, mockSisList } from "./mock-data";

export type OrgEntityType = "direction" | "sis";

interface OrgStructureStore {
  tree: OrgUnit[];
  directions: OrgItemType[];
  sisList: OrgItemType[];
  isLoading: boolean;
  updateItem: (entityType: OrgEntityType, item: OrgItemType) => void;
  setDirections: (items: OrgItemType[]) => void;
  setSisList: (items: OrgItemType[]) => void;
}

export const useOrgStructureStore = create<OrgStructureStore>()((set) => ({
  tree: mockTree,
  directions: mockDirections,
  sisList: mockSisList,
  isLoading: false,
  updateItem: (entityType, item) => {
    set((state) => {
      const key = entityType === "direction" ? "directions" : "sisList";
      return {
        [key]: state[key].map((i) =>
          i.id === item.id ? { ...i, ...item } : i,
        ),
      };
    });
  },
  setDirections: (directions) => set({ directions }),
  setSisList: (sisList) => set({ sisList }),
}));
