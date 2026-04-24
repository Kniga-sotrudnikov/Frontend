import { createBrowserRouter, Outlet } from "react-router";
import { App } from "@/app/app";
import { lazy } from "react";

const NotFoundPage = lazy(() => import("@/pages/404/not-found-page"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />, // необходим для того чтобы использовать providers для всех страниц
    children: [
      {
        element: <App />, // тут размещается sidebar
        children: [
          /*
            * Пример навигации по страницам:
            * - Страницы находятся в папке src/pages/[name_page]/[name_page]-page.tsx
            * - Имя страницы должно совпадать с именем папки
            * - Имя страницы должно быть в kebab-case
            * 
            * 
            * { path: '/[name_page]', lazy: () => import('@/pages/[name_page]/[name_page]-page') }
          */
        ]
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
        path: '*', 
        element: <NotFoundPage />  // 👈 ИСПОЛЬЗОВАТЬ element ВМЕСТО lazy
      },
    ],
  },
]);
