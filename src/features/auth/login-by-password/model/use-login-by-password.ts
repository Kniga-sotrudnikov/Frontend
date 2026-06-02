import { useMutation } from "@tanstack/react-query";
import {
  loginByPassword,
  type LoginRequest,
  type LoginResponse,
} from "@/features/auth";
import type { HttpError } from "@/shared/api/client/types";
import { useAuthStore } from "@/entities/user/model/store";
import { useNavigate } from "react-router";
import { ROUTES } from "@/shared/model/routes/routes";

export const useLoginByPassword = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  return useMutation<LoginResponse, HttpError, LoginRequest>({
    mutationFn: loginByPassword,

    onSuccess: (data) => {
      setAuth(data);
      navigate(ROUTES.EMPLOYEES);
    },
  });
};
