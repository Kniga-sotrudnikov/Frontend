# Работа с API

## HTTP-клиент

Базовый клиент — `apiClient` (`src/shared/api/client/api-client.ts`),
экземпляр Axios с `baseURL = import.meta.env.VITE_API_URL`.

- В **dev** запросы на `/api/v1` проксируются Vite на `VITE_API_URL`
  (`vite.config.ts`, `changeOrigin: true`, `secure: false`).
- В **production** запросы идут напрямую по `VITE_API_URL`.

Ошибки нормализуются через `handleHttpError`
(`src/shared/api/client/handle-http-error.ts`). JWT-логика
(access/refresh, logout при 401) — в перехватчиках, см.
[аутентификацию](authentication.md).

## Организация запросов

Запросы к бэкенду живут в сегменте `api/` соответствующего слайса
(`entities/<slice>/api/*-api.ts`, `features/<slice>/api/*.ts`).
Поверх них строятся TanStack Query hooks в `model/*-queries.ts` /
`model/*-mutations.ts` — компоненты работают с hooks, а не с Axios напрямую.

```
entities/employee/
├── api/employee-api.ts        → функции запросов (apiClient.get/post/patch/delete)
└── model/                     → useQuery / useMutation hooks поверх api
```

## Основные эндпоинты (по коду)

| Область        | Метод и путь                               | Где вызывается                                 |
| -------------- | ------------------------------------------ | ---------------------------------------------- |
| Аутентификация | `POST /auth/login/`                        | `features/auth/login-by-password`              |
|                | `POST /auth/login/magic-link/`             | `features/auth/login-by-link`                  |
|                | `POST /auth/login/magic-link/verify/`      | `features/auth/login-by-link`                  |
|                | `POST /auth/token/refresh/`                | `app/api/setup-interceptors.ts`                |
| Сотрудники     | `POST /admin/employees/…` (создание)       | `entities/employee/api/employee-api.ts`        |
|                | `PATCH /admin/employees/:id/` (обновление) | `entities/employee/api/employee-api.ts`        |
|                | `DELETE /admin/employees/:id/`             | `entities/employee/api/employee-api.ts`        |
| Теги           | `DELETE /tags/:id/`                        | `entities/tags/api/tags-api.ts`                |
|                | `POST /bulk/add-tags/`                     | `entities/tags/api/tags-api.ts`                |
|                | `POST /bulk/remove-tags/`                  | `entities/tags/api/tags-api.ts`                |
| Избранное      | `POST /favorites/`                         | `entities/favorites/api/favorites-api.ts`      |
|                | `DELETE /favorites/:employeeId/`           | `entities/favorites/api/favorites-api.ts`      |
| Оргструктура   | `DELETE /departments/:id/`                 | `entities/org-structure/api/department-api.ts` |

Список не исчерпывающий — актуальный набор смотри в `api/`-сегментах слайсов.

## Как добавить новый запрос

1. Добавь функцию запроса в `api/`-сегмент нужного слайса (или создай слайс),
   используй `apiClient` — токен и обработка 401 подключатся автоматически.
2. Типы ответа/запроса положи в `model/types.ts` слайса.
3. Оберни в `useQuery` (чтение) или `useMutation` (изменение) в
   `model/*-queries.ts` / `model/*-mutations.ts`. Для мутаций не забудь
   инвалидировать связанные query-ключи.
4. Экспортируй через `index.ts` слайса и используй hook в компоненте.
