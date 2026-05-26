import { createBrowserRouter, redirect } from "react-router";
import { App } from "@/app/app";
import { ProvidersLayout } from "@/app/providers/providers-layout";
import { ROUTES } from "@/shared/model/routes/routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProvidersLayout />, // необходим для того чтобы использовать providers для всех страниц
    children: [
      {
        element: <App />, // тут размещается sidebar
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
            lazy: () => import("@/pages/org-structure/org-structure-page.tsx"),
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
          /*
           * Пример навигации по страницам:
           * - Страницы находятся в папке src/pages/[name_page]/[name_page]-page.tsx
           * - Имя страницы должно совпадать с именем папки
           * - Имя страницы должно быть в kebab-case
           *
           *
           * { path: '/[name_page]', lazy: () => import('@/pages/[name_page]/[name_page]-page') }
           */
        ],
      },
      /*
       * Пример навигации по страницам:
       * - те же правила что и в примере выше
       * - нет sidebar
       *
       * { path: '/login', lazy: () => import('@/pages/login/login-page') },
       * { path: '*', lazy: () => import('@/pages/404/404-page') },
       */

      {
        path: ROUTES.LOGIN,
        lazy: () => import("@/pages/login/login-page"),
      },
      {
        path: "*",
        lazy: () => import("@/pages/404/not-found-page"),
      },
    ],
  },
]);
