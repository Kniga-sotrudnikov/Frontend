import { Navigate, Outlet, useLocation } from "react-router";

import { ROUTES } from "@/shared/model/routes/routes.ts";
import { useAuthStore } from "@/entities/user";

type TLoginLocationState = {
  from?: string;
};

export const GuestOnlyRoute = () => {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();

  const locationState = location.state as TLoginLocationState | null;
  const redirectTo = locationState?.from ?? ROUTES.EMPLOYEES;

  if (user) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};
