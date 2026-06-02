export type HttpError = {
  detail: string;
  status?: number;
};

export type BackendErrorResponse = {
  detail?: string;
  message?: string;
};
