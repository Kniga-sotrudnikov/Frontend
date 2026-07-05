export {
  getTagsApi,
  getTagDetailApi,
  createTagApi,
  updateTagApi,
  deleteTagApi,
  bulkAddTagsApi,
  bulkRemoveTagsApi,
} from "./api/tags-api";

export type {
  Tag,
  TagsListResponse,
  CreateTagPayload,
  UpdateTagPayload,
  BulkTagsPayload,
} from "./model/types";

export {
  tagsKeys,
  useTags,
  useCreateTag,
  useUpdateTag,
  useDeleteTag,
  useBulkAddTags,
  useBulkRemoveTags,
  useTagsWithEmployees,
} from "./model/tags-queries";