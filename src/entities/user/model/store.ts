import { create } from "zustand";
import type { CurrentUser } from "./types";

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  user: CurrentUser | null;

  setAuth: (data: {
    access: string;
    refresh: string;
    user: CurrentUser;
  }) => void;

  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,

  setAuth: (data) =>
    set({
      user: data.user,
      accessToken: data.access,
      refreshToken: data.refresh,
    }),

  logout: () =>
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
    }),
}));
