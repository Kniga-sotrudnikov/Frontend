import { useMutation } from "@tanstack/react-query";
import {
  loginByPassword,
  type LoginRequest,
  type LoginResponse,
} from "@/features/auth";
import type { HttpError } from "@/shared/api/client/types";
import { useAuthStore } from "@/entities/user";

export const useLoginByPassword = () => {
  const { setAuth } = useAuthStore();

  return useMutation<LoginResponse, HttpError, LoginRequest>({
    mutationFn: loginByPassword,

    onSuccess: (data) => {
      setAuth(data);
    },
  });
};
