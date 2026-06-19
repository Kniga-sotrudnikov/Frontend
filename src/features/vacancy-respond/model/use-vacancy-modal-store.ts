import { create } from "zustand";
import type { VacancyData } from "@/entities/vacancy";

interface VacancyModalStore {
  selectedVacancy: VacancyData | null;
  openVacancyModal: (vacancy: VacancyData) => void;
  closeVacancyModal: () => void;
}

export const useVacancyModalStore = create<VacancyModalStore>((set) => ({
  selectedVacancy: null,
  openVacancyModal: (vacancy) => {
    const url = new URL(window.location.href);
    url.searchParams.set("vacancy", String(vacancy.id));
    window.history.pushState({}, "", url.toString());
    set({ selectedVacancy: vacancy });
  },
  closeVacancyModal: () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("vacancy");
    window.history.pushState({}, "", url.toString());
    set({ selectedVacancy: null });
  },
}));
