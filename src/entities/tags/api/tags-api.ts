import { apiClient } from "@/shared/api/client";
import type {
  Tag,
  TagsListResponse,
  CreateTagPayload,
  UpdateTagPayload,
  BulkTagsPayload,
} from "../model/types";

export const getTagsApi = async (params?: {
  limit?: number;
  offset?: number;
}): Promise<TagsListResponse> => {
  const response = await apiClient.get<TagsListResponse>("/tags/", { params });
  return response.data;
};

export const getTagDetailApi = async (id: number): Promise<Tag> => {
  const response = await apiClient.get<Tag>(`/tags/${id}/`);
  return response.data;
};

export const createTagApi = async (data: CreateTagPayload): Promise<Tag> => {
  const response = await apiClient.post<Tag>("/tags/", data);
  return response.data;
};

export const updateTagApi = async (
  id: number,
  data: UpdateTagPayload,
): Promise<Tag> => {
  const response = await apiClient.patch<Tag>(`/tags/${id}/`, data);
  return response.data;
};

export const deleteTagApi = async (id: number): Promise<void> => {
  await apiClient.delete(`/tags/${id}/`);
};

export const bulkAddTagsApi = async (data: BulkTagsPayload): Promise<void> => {
  await apiClient.post("/bulk/add-tags/", data);
};

export const bulkRemoveTagsApi = async (data: BulkTagsPayload): Promise<void> => {
  await apiClient.post("/bulk/remove-tags/", data);
};