# Управление состоянием

В проекте два вида состояния с чётким разделением:

- **Серверное состояние** — TanStack Query (`@tanstack/react-query`).
- **Клиентское (UI) состояние** — Zustand.

## Серверное состояние: TanStack Query

Провайдер подключён в `src/app/providers/query-provider`.
Hooks живут в `model/`-сегментах слайсов:

- `*-queries.ts` — `useQuery` для чтения данных;
- `*-mutations.ts` — `useMutation` для изменений (+ инвалидация query-ключей).

Правило: компоненты не вызывают `apiClient` напрямую — только через
query/mutation hooks.

## Клиентское состояние: Zustand

| Стор                            | Расположение                                                   | Назначение                                      |
| ------------------------------- | -------------------------------------------------------------- | ----------------------------------------------- |
| `useAuthStore`                  | `src/entities/user/model/store.ts`                             | сессия: токены и текущий пользователь (persist) |
| `useSelectionUnitStore`         | `src/entities/org-structure/model/use-selection-unit-store.ts` | выбранный узел оргструктуры                     |
| сторы модальных окон сотрудника | `src/features/employee/model/`                                 | открытие/состояние модальных окон сотрудника    |
| стор модального окна вакансии   | `src/features/vacancy-respond/model/`                          | открытие/состояние модального окна отклика      |
| `useNotificationStore`          | `src/shared/model/stores/use-notification-store.ts`            | глобальные уведомления                          |

Особенности:

- Только `useAuthStore` использует `persist` (localStorage, ключ `auth-storage`).
- Остальные сторы — in-memory, сбрасываются при перезагрузке страницы.
- Глобальные уведомления показываются компонентом `shared/ui/notification`.

## Что куда класть

- Данные с бэкенда, кэш, фоновые обновления → **TanStack Query**.
- Локальное UI-состояние между компонентами (открытая модалка, выбранный узел,
  черновик несохранённого выбора) → **Zustand**.
- Состояние одной формы → `react-hook-form` + `zod` (см. `features/*/model/schema.ts`).
- Состояние одного компонента → обычный `useState` — не тащи его в глобальный стор.
