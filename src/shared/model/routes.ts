import "react-router";

/**
 * Константы URL. Добавляй сегменты с `:имя` там, где нужен динамический параметр.
 * Дальше для каждого такого пути допиши запись в `PathParams` (тем же литералом пути).
 *
 * `declare module "react-router"` + `Register.params` — чтобы `useParams()` знал типы
 * по текущему маршруту (см. доку react-router про типизацию роутов).
 */
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  NOT_FOUND: "/404",

  /*
  * пример: путь с параметром 
  * ROUTES.NAME_PAGE_1: "/name_page_1/:id"
  * 
  * в PathParams ниже добавь 
  * [ROUTES.NAME_PAGE_1]: { id: string } 
  * */
  NAME_PAGE_1: "/name_page_1/:id",
} as const;

export type PathParams = {
  [ROUTES.NAME_PAGE_1]: {
    id: string;
  };
};

declare module "react-router" {
  interface Register {
    params: PathParams;
  }
}
