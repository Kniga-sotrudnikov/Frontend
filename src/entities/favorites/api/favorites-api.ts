import { apiClient } from "@/shared/api/client";
import type { EmployeeShortResponse } from "@/entities/employee";
import type { FavoritesListParams } from "../model/types";

interface RawFavoritesResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export const favoritesApi = {
  getFavorites: async (
    params?: FavoritesListParams,
  ): Promise<RawFavoritesResponse<EmployeeShortResponse>> => {
    const response = await apiClient.get<
      RawFavoritesResponse<EmployeeShortResponse>
    >("/favorites/", { params });
    return response.data;
  },

  addFavorite: async (employeeId: number): Promise<void> => {
    await apiClient.post("/favorites/", {
      employee_id: employeeId,
    });
  },

  removeFavorite: async (employeeId: number): Promise<void> => {
    await apiClient.delete(`/favorites/${employeeId}/`);
  },
};
