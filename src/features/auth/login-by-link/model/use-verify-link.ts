import { useMutation } from "@tanstack/react-query";
import { verifyMagicLink } from "../api/verify-link";
import type {
  VerifyMagicLinkRequest,
  VerifyMagicLinkResponse,
} from "../api/verify-link";
import type { ApiError } from "@/shared/api/client/types";
import { useAuthStore } from "@/entities/user/model/store";
import { useNavigate } from "react-router";
import { ROUTES } from "@/shared/model/routes/routes";

export const useVerifyMagicLink = () => {
  const navigate = useNavigate();

  return useMutation<VerifyMagicLinkResponse, ApiError, VerifyMagicLinkRequest>(
    {
      mutationFn: verifyMagicLink,

      onSuccess: (data) => {
        useAuthStore.getState().setAuth(data);
        navigate(ROUTES.EMPLOYEES);
      },
    },
  );
};
