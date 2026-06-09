import axios, { type InternalAxiosRequestConfig } from "axios";
import { apiClient, handleHttpError } from "@/shared/api/client";
import { useAuthStore } from "@/entities/user";
import { ROUTES } from "@/shared/model/routes/routes";
import { router } from "@/app/routes";
interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const performLogout = () => {
  const location = router.state.location;
  useAuthStore.getState().logout();

  if (location.pathname !== ROUTES.LOGIN) {
    const url = location.pathname + location.search + location.hash;
    router
      .navigate(ROUTES.LOGIN, {
        replace: true,
        state: { from: url },
      })
      .catch((navigationError) => {
        console.error("Ошибка навигации", navigationError);
      });
  }
};

export const setupInterceptors = () => {
  apiClient.interceptors.request.use((config) => {
    const accessToken = useAuthStore.getState().accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        const originalRequest = error.config as RetryableRequestConfig;

        if (!originalRequest) {
          performLogout();
          return Promise.reject(error);
        }

        const { refreshToken } = useAuthStore.getState();

        if (!refreshToken) {
          performLogout();
          return Promise.reject(error);
        }

        if (originalRequest._retry) {
          performLogout();
          return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
          const refreshResponse = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/v1/auth/token/refresh/`,
            { refresh: refreshToken },
          );

          const newAccessToken = refreshResponse.data.access;
          const user = useAuthStore.getState().user;
          useAuthStore.getState().setAuth({
            access: newAccessToken,
            refresh: refreshToken,
            user: user!,
          });

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }
          return apiClient(originalRequest);
        } catch {
          performLogout();
          return Promise.reject(error);
        }
      }

      return Promise.reject(handleHttpError(error));
    },
  );
};
