import { createBrowserRouter, redirect } from "react-router";
import { App } from "@/app/app";
import { ProvidersLayout } from "@/app/providers/providers-layout";
import { ROUTES } from "@/shared/model/routes/routes";
import { ProtectedRoute } from "@/app/routes/protected-route";
import { GuestOnlyRoute } from "@/app/routes/guest-only-route";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProvidersLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <App />,
            children: [
              {
                index: true,
                loader: () => redirect(ROUTES.EMPLOYEES),
              },
              {
                path: ROUTES.EMPLOYEES,
                lazy: () => import("@/pages/employees/employees-page"),
              },
              {
                path: ROUTES.ORG_STRUCTURE,
                lazy: () =>
                  import("@/pages/org-structure/org-structure-page.tsx"),
              },
              {
                path: ROUTES.PROJECTS,
                lazy: () => import("@/pages/projects/projects-page.tsx"),
              },
              {
                path: ROUTES.SETTINGS,
                lazy: () => import("@/pages/settings/settings-page.tsx"),
              },
              {
                path: ROUTES.HELP,
                lazy: () => import("@/pages/help/help-page.tsx"),
              },
            ],
          },
        ],
      },
      {
        element: <GuestOnlyRoute />,
        children: [
          {
            path: ROUTES.LOGIN,
            lazy: () => import("@/pages/login/login-page"),
          },
        ],
      },
      {
        path: ROUTES.MAGIC_LOGIN,
        lazy: () => import("@/pages/magic-login/magic-login-page"),
      },
      {
        path: "*",
        lazy: () => import("@/pages/404/not-found-page"),
      },
    ],
  },
]);
