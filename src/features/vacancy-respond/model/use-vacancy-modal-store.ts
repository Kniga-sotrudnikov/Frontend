import { create } from "zustand";
import type { VacancyData } from "@/entities/vacancy";

interface VacancyModalStore {
  selectedVacancy: VacancyData | null;
  openModal: (vacancy: VacancyData) => void;
  closeModal: () => void;
}

export const useVacancyModalStore = create<VacancyModalStore>((set) => ({
  selectedVacancy: null,
  openModal: (vacancy) => set({ selectedVacancy: vacancy }),
  closeModal: () => set({ selectedVacancy: null }),
}));
