import type { AxiosError } from "axios";
import { ApiError, type BackendErrorResponse } from "./types";



function isBackendError(data: unknown): data is BackendErrorResponse {
  return (
    typeof data === "object" &&
    data !== null &&
    ("detail" in data || "message" in data)
  );
}

export function handleHttpError(error: AxiosError): never {
  const status = error.response?.status;
  const data = error.response?.data;

  let backendMessage = "UNKNOWN_ERROR";

  //Этот ужас пока я не знаю что возвращает бекенд в ошибках. В будущем можно типизировать нормально когда будет контракт
  if (isBackendError(data)) {
    backendMessage = data.detail || data.message || "UNKNOWN_ERROR";
  }

  if (!status) {
    throw new ApiError("NETWORK_ERROR");
  }

  if (status === 400) {
    throw new ApiError(
      "BAD_REQUEST",
      400,
      backendMessage
    );
  }

  if (status === 401) {
    throw new ApiError("UNAUTHORIZED", 401, backendMessage);
  }

  if (status === 403) {
    throw new ApiError("FORBIDDEN", 403);
  }

  if (status >= 500) {
    throw new ApiError("SERVER_ERROR", status);
  }
  
  throw new ApiError(backendMessage, status);
}
