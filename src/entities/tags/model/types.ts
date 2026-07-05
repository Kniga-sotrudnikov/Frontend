export interface Tag {
  id: number;
  name: string;
}

export interface TagsListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Tag[];
}

export interface CreateTagPayload {
  name: string;
}

export interface UpdateTagPayload {
  name: string;
}

export interface BulkTagsPayload {
  employee_ids: number[];
  tag_ids: number[];
}
