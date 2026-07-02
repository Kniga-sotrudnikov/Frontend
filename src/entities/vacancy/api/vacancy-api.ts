import { apiClient } from "@/shared/api/client";
import type { VacanciesResponse, VacancyDetail } from "../model/types";

export const vacancyApi = {
  getVacancies: async (params?: {
    limit?: number;
    offset?: number;
  }): Promise<VacanciesResponse> => {
    const response = await apiClient.get<VacanciesResponse>("/vacancies/", {
      params,
    });
    return response.data;
  },

  getVacancyDetail: async (id: number): Promise<VacancyDetail> => {
    const response = await apiClient.get<VacancyDetail>(`/vacancies/${id}/`);
    return response.data;
  },
};
