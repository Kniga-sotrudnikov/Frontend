import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { favoritesApi } from "../api/favorites-api";
import { mapEmployeeListResponse } from "@/entities/employee";
import { useNotificationStore } from "@/shared/model/stores";
import type {
  AddFavoriteRequest,
  FavoritesListResponse,
  FavoritesListParams,
  UseToggleFavoriteReturn,
} from "../model/types";

export const favoritesKeys = {
  all: ["favorites", "list"] as const,
  list: (params?: FavoritesListParams) =>
    params
      ? ([...favoritesKeys.all, params] as const)
      : favoritesKeys.all,
};

export const useGetFavorites = (params?: FavoritesListParams) => {
  return useQuery<FavoritesListResponse>({
    queryKey: favoritesKeys.list(params),
    queryFn: async () => {
      const response = await favoritesApi.getFavorites(params);
      return {
        ...response,
        results: response.results.map(mapEmployeeListResponse),
      };
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
};

export const useAddFavorite = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore((state) => state.add);

  return useMutation({
    mutationFn: async ({
      employeeId,
    }: AddFavoriteRequest): Promise<void> => favoritesApi.addFavorite(employeeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: favoritesKeys.all });

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

export const useRemoveFavorite = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore((state) => state.add);

  return useMutation({
    mutationFn: favoritesApi.removeFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: favoritesKeys.all });

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

export const useToggleFavorite = (): UseToggleFavoriteReturn => {
  const { data: favoritesData, isLoading: isLoadingFavorites } =
    useGetFavorites();
  const { mutate: addFavorite, isPending: isAdding } = useAddFavorite();
  const { mutate: removeFavorite, isPending: isRemoving } = useRemoveFavorite();

  const favorites = favoritesData?.results ?? [];

  const isFavorite = (employeeId: number): boolean => {
    return favorites.some((favorite) => Number(favorite.id) === employeeId);
  };

  const toggleFavorite = (employeeId: number) => {
    if (isFavorite(employeeId)) {
      removeFavorite(employeeId);
    } else {
      addFavorite({ employeeId });
    }
  };

  return {
    isFavorite,
    toggleFavorite,
    isPending: isAdding || isRemoving || isLoadingFavorites,
    favorites,
  };
};
