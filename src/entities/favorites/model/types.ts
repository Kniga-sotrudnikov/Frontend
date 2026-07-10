import type { EmployeeData } from "@/entities/employee";

export type FavoriteItem = EmployeeData;

export type FavoritesListParams = {
  limit?: number;
  offset?: number;
};

export interface FavoritesListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: FavoriteItem[];
}

export interface AddFavoriteRequest {
  employeeId: number;
}

export interface UseToggleFavoriteReturn {
  isFavorite: (employeeId: number) => boolean;
  toggleFavorite: (employeeId: number) => void;
  isPending: boolean;
  favorites: FavoriteItem[];
}
