import { apiClient } from "@/shared/api/client";
import type { CurrentUser } from "@/entities/user/model/types";

export type VerifyMagicLinkRequest = {
  token: string;
};

export type VerifyMagicLinkResponse = {
  access: string;
  refresh: string;
  user: CurrentUser;
};

export const verifyMagicLink = async (
  data: VerifyMagicLinkRequest,
): Promise<VerifyMagicLinkResponse> => {
  const response = await apiClient.post("/auth/login/magic-link/verify/", data);
  return response.data;
};
