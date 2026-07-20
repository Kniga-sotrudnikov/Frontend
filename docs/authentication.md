# Аутентификация

Аутентификация построена на JWT (access + refresh токены). Два способа входа:
по логину/паролю и по магической ссылке.

## Способы входа

| Сценарий                   | Слайс                             | Эндпоинт                              |
| -------------------------- | --------------------------------- | ------------------------------------- |
| Вход по паролю             | `features/auth/login-by-password` | `POST /auth/login/`                   |
| Отправка магической ссылки | `features/auth/login-by-link`     | `POST /auth/login/magic-link/`        |
| Подтверждение ссылки       | `features/auth/login-by-link`     | `POST /auth/login/magic-link/verify/` |
| Обновление токена          | перехватчик Axios                 | `POST /auth/token/refresh/`           |

## Хранение сессии

Состояние пользователя — Zustand-стор `useAuthStore`
(`src/entities/user/model/store.ts`) с `persist` в `localStorage`
(ключ `auth-storage`). Хранит:

- `accessToken`, `refreshToken`,
- `user` (текущий пользователь; роль — `"employee" | "hr_admin"`),
- действия `setAuth(...)` и `logout()`.

> ⚠️ Токены в `localStorage` — удобно, но учитывай риски XSS при добавлении
> сторонних скриптов на страницу.

## Перехватчики Axios

`src/app/api/setup-interceptors.ts`:

- **Request-перехватчик** добавляет `Authorization: Bearer <accessToken>`
  к каждому запросу через `apiClient`.
- **Response-перехватчик** при ответе `401`:
  1. Берёт `refreshToken` из стора; если его нет — logout и редирект на `/login`.
  2. Пробует обновить access-токен через `POST /auth/token/refresh/`
     (refresh-токен передаётся **в теле** запроса в поле `refresh`, а не в `Authorization`).
  3. При успехе сохраняет новый access-токен и **повторяет исходный запрос**
     (флаг `_retry` защищает от бесконечного цикла).
  4. При неудаче — logout и редирект на `/login` с сохранением текущего URL
     в `state.from`, чтобы после входа вернуть пользователя обратно.

Logout выполняется функцией `performLogout()`: очищает стор и навигирует
на `/login` (если пользователь ещё не там).

## Роли

Роль пользователя: `"employee" | "hr_admin"` (тип `CurrentUser` в
`src/entities/user/model/types.ts`). Используется для разграничения
возможностей в UI (например, административные действия вроде удаления
сотрудника через `/admin/employees/:id/`).

## Что нельзя ломать

Любые изменения в `src/app/api/setup-interceptors.ts` или
`src/entities/user/model/store.ts` затрагивают всю аутентификацию.
Тестируй такие правки на реальном бэкенде или моках: вход, протухший
access-токен (refresh), протухший refresh-токен (logout + редирект).
