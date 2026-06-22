import { useAuthStore } from "@/entities/user";

export const useIsAdmin = () => {
  return useAuthStore((state) => state.user?.role === "hr_admin");
};
