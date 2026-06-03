import { apiClient } from "@/shared/api/client";

export type SendLinkRequest = {
  email: string;
};

export const sendMagicLink = async (data: SendLinkRequest) => {
  const response = await apiClient.post("/auth/login/magic-link/", data);

  return response.data;
};
