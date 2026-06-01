import type { CurrentUser } from "@/entities/user";
import { apiClient } from "@/shared/api/client";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  access: string;
  refresh: string;
  user: CurrentUser;
};

export const loginByPassword = async (
  data: LoginRequest,
): Promise<LoginResponse> => {
  const response = await apiClient.post("/auth/login/", data);
  return response.data;
};
