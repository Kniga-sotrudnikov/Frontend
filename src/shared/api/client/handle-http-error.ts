import type { AxiosError } from "axios";

export function handleHttpError(error: AxiosError): void {
  const status = error.response?.status;
  if (status === undefined) {
    // TODO: обработка сетевых ошибок
    return;
  }

  if (status === 401) {
    // TODO: обработка ошибок авторизации
    return;
  }

  if (status === 403) {
    // TODO: обработка ошибок доступа
    return;
  }

  if (status >= 500) {
    // TODO: обработка серверных ошибок
    return;
  }
}
