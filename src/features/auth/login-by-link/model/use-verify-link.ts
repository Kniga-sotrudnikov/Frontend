import { useMutation } from "@tanstack/react-query";
import { verifyMagicLink, type VerifyMagicLinkRequest, type VerifyMagicLinkResponse } from "@/features/auth";
import type { HttpError } from "@/shared/api/client/types";
import { useAuthStore } from "@/entities/user/model/store";
import { useNavigate } from "react-router";
import { ROUTES } from "@/shared/model/routes/routes";

export const useVerifyMagicLink = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore()

  return useMutation<VerifyMagicLinkResponse, HttpError, VerifyMagicLinkRequest>(
    {
      mutationFn: verifyMagicLink,

      onSuccess: (data) => {
        setAuth(data);
        navigate(ROUTES.EMPLOYEES);
      },
    },
  );
};
