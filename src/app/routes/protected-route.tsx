import { Navigate, Outlet, useLocation } from "react-router";

import { ROUTES } from "@/shared/model/routes/routes.ts";
import { useAuthStore } from "@/entities/user";

export const ProtectedRoute = () => {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();

  if (!user) {
    const url = location.pathname + location.search + location.hash;

    return <Navigate to={ROUTES.LOGIN} state={{ from: url }} replace />;
  }

  return <Outlet />;
};
