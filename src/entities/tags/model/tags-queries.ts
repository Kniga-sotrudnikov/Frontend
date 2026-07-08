import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTagsApi,
  createTagApi,
  updateTagApi,
  deleteTagApi,
  bulkAddTagsApi,
  bulkRemoveTagsApi,
} from "../api/tags-api";
import type { UpdateTagPayload, TagsListResponse } from "./types";

export const tagsKeys = {
  all: ["tags"] as const,
  lists: () => [...tagsKeys.all, "list"] as const,
  list: (params?: { limit?: number; offset?: number }) =>
    [...tagsKeys.lists(), params] as const,
  details: () => [...tagsKeys.all, "detail"] as const,
  detail: (id: number) => [...tagsKeys.details(), id] as const,
};

export const useTags = (params?: { limit?: number; offset?: number }) => {
  return useQuery({
    queryKey: tagsKeys.list(params),
    queryFn: () => getTagsApi(params),
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTagApi,
    onSuccess: (newTag) => {
      // Инвалидируем все списки тегов, чтобы обновить все компоненты
      queryClient.invalidateQueries({ queryKey: tagsKeys.lists() });
      
      // Оптимистично обновляем все кэши с тегами
      // Проходим по всем ключам и обновляем те, которые начинаются с tags
      queryClient.setQueriesData<TagsListResponse>(
        { queryKey: tagsKeys.lists(), exact: false },
        (oldData) => {
          if (!oldData) return oldData;
          // Проверяем, есть ли уже такой тег в кэше (избегаем дублей)
          const exists = oldData.results.some(tag => tag.id === newTag.id);
          if (exists) return oldData;
          
          return {
            ...oldData,
            results: [...oldData.results, newTag],
            count: oldData.count + 1,
          };
        }
      );
      
      return newTag;
    },
  });
};

export const useUpdateTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateTagPayload }) =>
      updateTagApi(id, data),
    onSuccess: (updatedTag, variables) => {
      // Инвалидируем списки
      queryClient.invalidateQueries({ queryKey: tagsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: tagsKeys.detail(variables.id),
      });
      
      // Оптимистично обновляем все кэши
      queryClient.setQueriesData<TagsListResponse>(
        { queryKey: tagsKeys.lists(), exact: false },
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            results: oldData.results.map((tag) =>
              tag.id === variables.id ? { ...tag, ...updatedTag } : tag
            ),
          };
        }
      );
    },
  });
};

export const useDeleteTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTagApi,
    onSuccess: (_, deletedId) => {
      // Инвалидируем списки
      queryClient.invalidateQueries({ queryKey: tagsKeys.lists() });
      
      // Оптимистично удаляем из всех кэшей
      queryClient.setQueriesData<TagsListResponse>(
        { queryKey: tagsKeys.lists(), exact: false },
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            results: oldData.results.filter((tag) => tag.id !== deletedId),
            count: oldData.count - 1,
          };
        }
      );
    },
  });
};

export const useBulkAddTags = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bulkAddTagsApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tagsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: ["employees-list"] });
    },
  });
};

export const useBulkRemoveTags = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bulkRemoveTagsApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tagsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: ["employees-list"] });
    },
  });
};

export const useTagsWithEmployees = () => {
  return useQuery({
    queryKey: tagsKeys.lists(),
    queryFn: () => getTagsApi({ limit: 100 }),
    staleTime: 5 * 60 * 1000,
    select: (data) => data.results || [],
  });
};