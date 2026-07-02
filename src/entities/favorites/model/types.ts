/**
 * Нормализованный объект избранного (единый формат для всего приложения)
 */
export interface NormalizedFavorite {
  id: number; // ID записи избранного
  employeeId: number; // ID сотрудника (нормализованное поле)
  userId?: number; // ID пользователя, добавившего (только для админа)
  note?: string; // Заметка (только для админа)
  createdAt: string; // Дата добавления
}

/**
 * Нормализованный ответ API с пагинацией
 */
export interface NormalizedFavoritesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NormalizedFavorite[];
}

/**
 * Запрос на добавление в избранное
 */
export interface AddFavoriteRequest {
  employeeId: number;
  note?: string; // только для админа
}

/**
 * Ответ на добавление (нормализованный)
 */
export type AddFavoriteResponse = NormalizedFavorite;

/**
 * Тип для проверки isFavorite
 */
export interface UseToggleFavoriteReturn {
  isFavorite: (employeeId: number) => boolean;
  toggleFavorite: (employeeId: number, note?: string) => void;
  isPending: boolean;
  favorites: NormalizedFavorite[];
}
