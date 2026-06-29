import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { favoritesApi } from "../api/favorites-api";
import {
  normalizeFavorite,
  normalizeFavoritesResponse,
} from "../lib/normalize";
import { useIsAdmin } from "@/entities/user";
import { useNotificationStore } from "@/shared/model/stores";
import type {
  NormalizedFavorite,
  NormalizedFavoritesResponse,
  AddFavoriteRequest,
  UseToggleFavoriteReturn,
} from "../model/types";

/**
 * Ключи для React Query (для инвалидации кэша)
 */
export const favoritesKeys = {
  all: ["favorites"] as const,
  list: () => [...favoritesKeys.all, "list"] as const,
};

/**
 * Хук для получения списка избранного
 * Автоматически выбирает API в зависимости от роли пользователя:
 * - Админ → /admin/favorites/ (видит все избранное + заметки)
 * - Пользователь → /favorites/ (видит только свои избранные)
 */
export const useGetFavorites = () => {
  const isAdmin = useIsAdmin();

  return useQuery<NormalizedFavoritesResponse>({
    queryKey: favoritesKeys.list(),
    queryFn: async () => {
      // 1. Выбираем API в зависимости от роли
      const response = isAdmin
        ? await favoritesApi.getAdminFavorites()
        : await favoritesApi.getUserFavorites();

      // 2. Нормализуем данные к единому формату
      return normalizeFavoritesResponse(response);
    },
    staleTime: 5 * 60 * 1000, // 5 минут
    refetchOnWindowFocus: true,
  });
};

/**
 * Хук для добавления в избранное
 * Автоматически выбирает API в зависимости от роли:
 * - Админ → может добавить с заметкой
 * - Пользователь → добавляет без заметки
 */
export const useAddFavorite = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore((state) => state.add);
  const isAdmin = useIsAdmin();

  return useMutation({
    mutationFn: async ({
      employeeId,
      note,
    }: AddFavoriteRequest): Promise<NormalizedFavorite> => {
      let rawResult;

      if (isAdmin) {
        rawResult = await favoritesApi.addAdminFavorite(employeeId, note);
      } else {
        rawResult = await favoritesApi.addUserFavorite(employeeId);
      }

      return normalizeFavorite(rawResult);
    },
    onSuccess: () => {
      // Инвалидируем кэш, чтобы обновить список
      queryClient.invalidateQueries({ queryKey: favoritesKeys.list() });

      addNotification({
        iconType: "success",
        title: "Успешно",
        message: "Сотрудник добавлен в избранное",
      });
    },
    onError: (error) => {
      console.error("Ошибка при добавлении в избранное:", error);

      addNotification({
        iconType: "error",
        title: "Ошибка",
        message:
          "Не удалось добавить сотрудника в избранное. Попробуйте позже.",
      });
    },
  });
};

/**
 * Хук для удаления из избранного
 * Автоматически выбирает API в зависимости от роли
 */
export const useRemoveFavorite = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore((state) => state.add);
  const isAdmin = useIsAdmin();

  return useMutation({
    mutationFn: async (employeeId: number): Promise<void> => {
      if (isAdmin) {
        await favoritesApi.removeAdminFavorite(employeeId);
      } else {
        await favoritesApi.removeUserFavorite(employeeId);
      }
    },
    onSuccess: () => {
      // Инвалидируем кэш, чтобы обновить список
      queryClient.invalidateQueries({ queryKey: favoritesKeys.list() });

      addNotification({
        iconType: "success",
        title: "Успешно",
        message: "Сотрудник удален из избранного",
      });
    },
    onError: (error) => {
      console.error("Ошибка при удалении из избранного:", error);

      addNotification({
        iconType: "error",
        title: "Ошибка",
        message:
          "Не удалось удалить сотрудника из избранного. Попробуйте позже.",
      });
    },
  });
};

/**
 * Хук для переключения состояния избранного (добавить/удалить)
 * Объединяет isFavorite, toggleFavorite и состояния загрузки
 */
export const useToggleFavorite = (): UseToggleFavoriteReturn => {
  const { data: favoritesData, isLoading: isLoadingFavorites } =
    useGetFavorites();
  const { mutate: addFavorite, isPending: isAdding } = useAddFavorite();
  const { mutate: removeFavorite, isPending: isRemoving } = useRemoveFavorite();

  const favorites = favoritesData?.results ?? [];

  /**
   * Проверить, находится ли сотрудник в избранном
   */
  const isFavorite = (employeeId: number): boolean => {
    return favorites.some((fav) => fav.employeeId === employeeId);
  };

  /**
   * Переключить состояние избранного
   * - Если в избранном → удалить
   * - Если не в избранном → добавить
   */
  const toggleFavorite = (employeeId: number, note?: string) => {
    if (isFavorite(employeeId)) {
      removeFavorite(employeeId);
    } else {
      addFavorite({ employeeId, note });
    }
  };

  return {
    isFavorite,
    toggleFavorite,
    isPending: isAdding || isRemoving || isLoadingFavorites,
    favorites,
  };
};
