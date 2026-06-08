import axios from "axios";
import { apiClient, handleHttpError } from "@/shared/api/client";
import { useAuthStore } from "@/entities/user";
import { ROUTES } from "@/shared/model/routes/routes";
import { router } from "@/app/routes";

export const setupInterceptors = () => {
  apiClient.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          const location = router.state.location;

          useAuthStore.getState().logout();

          if (location.pathname !== ROUTES.LOGIN) {
            const url = location.pathname + location.search + location.hash;

            void router.navigate(ROUTES.LOGIN, {
              replace: true,
              state: { from: url },
            });
          }
        }
        return Promise.reject(handleHttpError(error));
      }
      return Promise.reject(error);
    },
  );
};
