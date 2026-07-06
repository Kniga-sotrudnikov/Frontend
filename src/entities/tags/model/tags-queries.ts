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
      queryClient.invalidateQueries({ queryKey: tagsKeys.lists() });
      
      queryClient.setQueryData<TagsListResponse>(
        tagsKeys.list({ limit: 100 }),
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            results: [...oldData.results, newTag],
            count: oldData.count + 1,
          };
        },
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
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: tagsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: tagsKeys.detail(variables.id),
      });
    },
  });
};

export const useDeleteTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTagApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tagsKeys.lists() });
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