import { create } from "zustand";
import type { OrgUnit } from "./types";
import type { OrgItem } from "../ui/org-item";
import { mockTree, mockDirections, mockSisList } from "./mock-data";

interface OrgStructureStore {
  tree: OrgUnit[];
  directions: OrgItem[];
  sisList: OrgItem[];
  isLoading: boolean;
  fetch: () => Promise<void>;
}

export const useOrgStructureStore = create<OrgStructureStore>()(() => ({
  tree: mockTree,
  directions: mockDirections,
  sisList: mockSisList,
  isLoading: false,
  fetch: async () => {
    // Нужно добавить реальные запросы к бэку
  },
}));
