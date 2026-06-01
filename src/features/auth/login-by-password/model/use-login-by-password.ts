import { useMutation } from "@tanstack/react-query";
import { loginByPassword } from "../api/login";
import type { LoginRequest, LoginResponse } from "../api/login";
import type { ApiError } from "@/shared/api/client/types";
import { useAuthStore } from "@/entities/user/model/store";
import { useNavigate } from "react-router";
import { ROUTES } from "@/shared/model/routes/routes";

export const useLoginByPassword = () => {
  const navigate = useNavigate();

  return useMutation<LoginResponse, ApiError, LoginRequest>({
    mutationFn: loginByPassword,

    onSuccess: (data) => {
      useAuthStore.getState().setAuth(data);
      navigate(ROUTES.EMPLOYEES);
    },
  });
};
