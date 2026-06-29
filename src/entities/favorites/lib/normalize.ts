import type {
  NormalizedFavorite,
  NormalizedFavoritesResponse,
} from "../model/types";

type RawUserFavorite = {
  id: number;
  employee_id: number;
  created_at: string;
};

type RawAdminFavorite = {
  id: number;
  user: number;
  employee: number;
  note: string;
  created_at: string;
};

type RawFavoritesResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export function normalizeFavorite(
  fav: RawUserFavorite | RawAdminFavorite,
): NormalizedFavorite {
  const isAdminFav = "employee" in fav && "user" in fav;

  if (isAdminFav) {
    return {
      id: fav.id,
      employeeId: fav.employee,
      userId: fav.user,
      note: fav.note,
      createdAt: fav.created_at,
    };
  }

  return {
    id: fav.id,
    employeeId: fav.employee_id, // employee_id → employeeId
    createdAt: fav.created_at,
  };
}

export function normalizeFavoritesResponse(
  response: RawFavoritesResponse<RawUserFavorite | RawAdminFavorite>,
): NormalizedFavoritesResponse {
  return {
    count: response.count,
    next: response.next,
    previous: response.previous,
    results: response.results.map(normalizeFavorite),
  };
}
