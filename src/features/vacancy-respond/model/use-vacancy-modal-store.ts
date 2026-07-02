import { create } from "zustand";
import type { NormalizedVacancyDetail } from "@/entities/vacancy";

interface VacancyModalStore {
  selectedVacancy: NormalizedVacancyDetail | null;
  openVacancyModal: (vacancy: NormalizedVacancyDetail) => void;
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
