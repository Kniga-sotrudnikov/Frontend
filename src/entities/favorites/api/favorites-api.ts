import { apiClient } from "@/shared/api/client";

interface RawUserFavorite {
  id: number;
  employee_id: number;
  created_at: string;
}

interface RawAdminFavorite {
  id: number;
  user: number;
  employee: number;
  note: string;
  created_at: string;
}

interface RawFavoritesResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export const favoritesApi = {
  getUserFavorites: async (): Promise<
    RawFavoritesResponse<RawUserFavorite>
  > => {
    const response =
      await apiClient.get<RawFavoritesResponse<RawUserFavorite>>("/favorites/");
    return response.data;
  },

  getAdminFavorites: async (): Promise<
    RawFavoritesResponse<RawAdminFavorite>
  > => {
    const response =
      await apiClient.get<RawFavoritesResponse<RawAdminFavorite>>(
        "/admin/favorites/",
      );
    return response.data;
  },

  addUserFavorite: async (employeeId: number): Promise<RawUserFavorite> => {
    const response = await apiClient.post<RawUserFavorite>("/favorites/", {
      employee_id: employeeId,
    });
    return response.data;
  },

  addAdminFavorite: async (
    employeeId: number,
    note?: string,
  ): Promise<RawAdminFavorite> => {
    const response = await apiClient.post<RawAdminFavorite>(
      "/admin/favorites/",
      {
        employee_id: employeeId,
        note: note || "",
      },
    );
    return response.data;
  },

  removeUserFavorite: async (employeeId: number): Promise<void> => {
    await apiClient.delete(`/favorites/${employeeId}/`);
  },

  removeAdminFavorite: async (employeeId: number): Promise<void> => {
    await apiClient.delete(`/admin/favorites/${employeeId}/`);
  },
};
