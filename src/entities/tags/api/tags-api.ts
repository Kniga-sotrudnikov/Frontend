import { apiClient, handleHttpError } from "@/shared/api/client";
import type { AxiosError } from "axios";
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
  try {
    const response = await apiClient.get<TagsListResponse>("/tags/", {
      params,
    });
    return response.data;
  } catch (error) {
    throw handleHttpError(error as AxiosError);
  }
};

export const getTagDetailApi = async (id: number): Promise<Tag> => {
  try {
    const response = await apiClient.get<Tag>(`/tags/${id}/`);
    return response.data;
  } catch (error) {
    throw handleHttpError(error as AxiosError);
  }
};

export const createTagApi = async (data: CreateTagPayload): Promise<Tag> => {
  try {
    const response = await apiClient.post<Tag>("/tags/", data);
    return response.data;
  } catch (error) {
    throw handleHttpError(error as AxiosError);
  }
};

export const updateTagApi = async (
  id: number,
  data: UpdateTagPayload,
): Promise<Tag> => {
  try {
    const response = await apiClient.patch<Tag>(`/tags/${id}/`, data);
    return response.data;
  } catch (error) {
    throw handleHttpError(error as AxiosError);
  }
};

export const deleteTagApi = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(`/tags/${id}/`);
  } catch (error) {
    throw handleHttpError(error as AxiosError);
  }
};

export const bulkAddTagsApi = async (data: BulkTagsPayload): Promise<void> => {
  try {
    await apiClient.post("/bulk/add-tags/", data);
  } catch (error) {
    throw handleHttpError(error as AxiosError);
  }
};

export const bulkRemoveTagsApi = async (
  data: BulkTagsPayload,
): Promise<void> => {
  try {
    await apiClient.post("/bulk/remove-tags/", data);
  } catch (error) {
    throw handleHttpError(error as AxiosError);
  }
};
