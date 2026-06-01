export class ApiError extends Error  {
  status?: number;
  detail?: string;

  constructor(message: string, status?: number, detail?: string) {
    super(message);
    this.status = status;
    this.detail = detail;
  }
};

export type BackendErrorResponse = {
  detail?: string;
  message?: string;
};