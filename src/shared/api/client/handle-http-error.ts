import { useNotificationStore } from "@/shared/model/stores";
import type { AxiosError } from "axios";
import type { BackendErrorResponse, HttpError } from "@/shared/api/client";

function isBackendError(data: unknown): data is BackendErrorResponse {
  return (
    typeof data === "object" &&
    data !== null &&
    ("detail" in data || "message" in data)
  );
}

export function handleHttpError(error: AxiosError): HttpError {
  const status = error.response?.status;
  const data = error.response?.data;

  let backendMessage = "Произошла ошибка";

  //Этот ужас пока я не знаю что возвращает бекенд в ошибках. В будущем можно типизировать нормально когда будет контракт
  if (isBackendError(data)) {
    backendMessage = data.detail || data.message || backendMessage;
  }

  if (!status) {
    backendMessage = "Ошибка сети. Попробуйте позже";
  }

  if (status !== 401) {
    useNotificationStore.getState().add({
      type: "error",
      iconType: "error",
      title: "Ошибка",
      message: backendMessage,
    });
  }

  return {
    detail: backendMessage,
    status,
  };
}
