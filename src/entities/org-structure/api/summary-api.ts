import { apiClient } from "@/shared/api/client";

export interface SummaryStats {
  employees_count: number;
  directions_count: number;
  vacancies_count: number;
}

export const getSummaryStats = async (): Promise<SummaryStats> => {
  const response = await apiClient.get<SummaryStats>("/admin/summary/");
  return response.data;
};
