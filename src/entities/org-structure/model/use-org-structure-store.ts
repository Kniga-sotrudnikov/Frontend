import { create } from "zustand";
import type { OrgUnit } from "./types";
import type { OrgItemType } from "../ui/org-item";

export type OrgEntityType = "direction" | "sis";

interface OrgStructureStore {
  tree: OrgUnit[];
  directions: OrgItemType[];
  sisList: OrgItemType[];
  isLoading: boolean;
  updateItem: (entityType: OrgEntityType, item: OrgItemType) => void;
  setDirections: (items: OrgItemType[]) => void;
  setSisList: (items: OrgItemType[]) => void;
  setTree: (tree: OrgUnit[]) => void;
  loadFromTree: (tree: OrgUnit[]) => void;
}

export const useOrgStructureStore = create<OrgStructureStore>()((set) => ({
  tree: [],
  directions: [],
  sisList: [],
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
  setTree: (tree) => set({ tree }),
  loadFromTree: (tree) => {
    const directionsNode = tree.find(u => u.name === "Направления");
    const sisNode = tree.find(u => u.name === "СИС");

    const directions = directionsNode?.items?.map((item): OrgItemType => ({
      id: String(item.id || ''),
      name: item.name,
      headName: item.headName || '',
    })) || [];
    
    const sisList = sisNode?.items?.map((item): OrgItemType => ({
      id: String(item.id || ''),
      name: item.name,
      headName: item.headName || '',
    })) || [];
    
    set({ tree, directions, sisList });
  },
}));