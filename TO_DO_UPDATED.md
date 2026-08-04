# Актуальные задачи и проблемы Frontend

> Ревизия от **20.07.2026** (HEAD `develop`, e95b8dc).
> Заменяет собой: `TO_DO.md`, `DUPLICATE_REQUESTS_ANALYSIS.md`, `UNUSED_CODE_ANALYSIS.md`, фронтовую часть `API_ANALYSIS.md`.
> Метод: проверка каждого пункта старых документов по текущему коду (grep + knip + git log).

---

## 1. Закрыто с 10.07 (в старых файлах — можно архивировать)

| Пункт из старых документов | Как закрыт |
|---|---|
| TO_DO: разобраться с `widgets/employee-select/` | Виджет удалён (445feee), осталась одна версия `entities/employee/ui/employee-select.tsx`, используется в direction-модалках |
| TO_DO: мини-сотрудники в тегах не показываются | Исправлено (f674125, 0dc8614): чипы в строку в `tags-manager.tsx:542-601` |
| TO_DO: подключить `employee-not-found` + поиск | Подключён в `employees-page.tsx:36,285-296` (aadc473); поиск — через API-параметр `search` с debounce 400мс (2abf874) |
| Баг #7: `BirthdaysPopover` refetch при открытии | Исправлено (bb446c7): один `usePublicBirthdays`, без refetch |
| Баг #8: нет staleTime в org-structure хуках | Покрыто глобальным `staleTime: 5 мин` |
| Баг #9: глобальный `staleTime: 0`, `refetchOnWindowFocus: true` | Исправлено (0e50bd5): `query-provider.tsx` — staleTime 5 мин, refetchOnWindowFocus: false |
| Баг #1 (частично): тройной `/favorites/` | 3 → 2 запроса (см. актуальные, п. 2.2) |
| Мёртвые файлы: `widgets/employee-select`, `widgets/employee-card-small`, `pages/employees/mocks/`, `use-org-structure-store.ts`, `entities/employee/model/index.ts` | Все удалены |
| Моки `entities/user` (`mockCurrentUser`) и admin-birthday хуки/API | Удалены; `entities/user` — чистый auth-store |
| API: загрузка фото сотрудника не реализована | Реализовано (673c83b): `POST/PATCH /admin/employees/{id}/photo/` + мутации, вызовы из create/edit форм |
| API 2.3: `role_description` нет в CreateEmployeeRequest | Добавлено: `types.ts:83` |
| API 2.9/2.10: `TEmployeeStatus`/`EmployeeStatus` не совпадают с бэком | `TEmployeeStatus` приведён к `EmploymentStatusEnum`; мапперы переписаны (`mapEmployeeListResponse`, `mapEmployeeDetail`) |
| API 2.2 (частично): `supervisor_role_name`, `role_description` | Добавлены в `EmployeeDetailAdminResponse` (`types.ts:206,213`) |
| API: `GET /departments/` не используется | Используется + полный CRUD (`department-api.ts`) |
| `@fontsource-variable/geist` мёртвая зависимость | Удалена (5bae92b) |
| API 2.6: `FavoritesListResponse` неверный/неиспользуемый | Теперь семантически корректен: описывает нормализованный кэш после `mapEmployeeListResponse` |
| Руководитель в карточке: id вместо имени | Исправлено (214751e): имя из детального запроса |

---

## 2. 🔴 Высокий приоритет

### 2.1 `'sis'` в TypeEnum — расхождение с бэкендом (бэк: `'direction' | 'department'`)

- Типы: `entities/org-structure/model/types.ts:4,14,24,44,58`
- `features/create-direction-modal/model/types.ts:12`, `features/edit-direction-modal/model/types.ts:14`
- Runtime: `widgets/edit-org-structure-modal/edit-org-structure-modal.tsx:48,53,104,156`, `entities/org-structure/lib/derive-org-lists.ts:14`

**Сделать:** убрать `'sis'` из типов и логики (или получить от бэка подтверждение, что значение существует).

### 2.2 Дубли запросов на странице сотрудников

- **`role` не передаётся** → админ всегда получает публичный список: `employees-page.tsx:101-106` (`useEmployeesList(..., undefined, filter)`). ⚠️ Фикс существует (a3df0cf), но лежит в **невлитой ветке `fix/delete_tab`** — влить или перенести.
- **Все три вкладки грузятся одновременно**: `employees-page.tsx:101-118` — `useEmployeesList`/`useGetVacancies`/`useGetFavorites` без `enabled`. Хуки не принимают `options` (`use-vacancies.ts:24-38`, `use-favorites.ts:42-53`). **Сделать:** добавить `enabled: activeTab === ...`.
- **Два ключа на `/favorites/`**: `["favorites","list",{limit,offset}]` (page, :114-118) vs `["favorites","list"]` (`employees-list.tsx:85` + внутри `useToggleFavorite`). **Сделать:** один запрос на странице, `favoriteIds: Set<number>` пропсом вниз.
- **Orphan-ключ `["employees-raw",100,0]`**: `employees-filter-bar.tsx:42-45` — прямой `useQuery` + `getEmployeesListPublic` (игнорирует роль). Дублирует `["employees-list",100,0,...]`. **Сделать:** заменить на `useEmployeesList(100, 0, role)`.

### 2.3 Мутации не инвалидируют связанные кэши

Текущее состояние → чего не хватает:

| Мутация | Сейчас | Добавить |
|---|---|---|
| `useCreateEmployee` (`employee-mutations.ts:16-20`) | `employees-list` | `summary`, `employees-infinite`, `employees-raw` (пока жив) |
| `usePatchEmployee` (:44-52) | `employees-list`, `employee-detail` | `favorites` (имя/фото в избранном), `employees-infinite` |
| `useDeleteEmployee` (:69-73) | `employees-list` | `employee-detail`, `favorites`, `summary`, `employees-infinite` |
| dept-мутации (`use-department-mutations.ts:15,37,58`) | `org-structure` | `summary` (`directions_count`), **`departments-list`** |

⚠️ `employees-infinite` и `departments-list` — **новые ключи** (селекты руководителя и подразделения в `employee-form.tsx:63-69`), их не инвалидирует **ни одна** мутация. Корень ключа `employees-infinite` ≠ `employees-list`, префикс-матч не сработает.

### 2.4 `EmployeeProfileDialog` — лишний запрос + баг с должностью руководителя

- `employee-profile-dialog.tsx:61` — `useEmployeesList(100, 0, role)` ради `competencies`, но `mapEmployeeDetail` уже возвращает competencies как имена тегов (`map-temployee-to-employee-data.ts:99`). Запрос и `useTags`-маппинг (:81-106) избыточны.
- **Новый баг:** `leaderPosition={employee.position}` (:158-163, :325-330) — в карточку руководителя подставляется должность **самого сотрудника**. `mapEmployeeDetail` возвращает `supervisor.position` (:76-82), но поле `supervisor` в диалоге не используется.

---

## 3. 🟡 Средний приоритет

### 3.1 React Query

- `useEffect` для `?employee=`/`?vacancy=` зависит от массива `employees` (`employees-page.tsx:222-235`) → модалка переоткрывается при пагинации/инвалидации. **Сделать:** `useRef`-флаг однократной обработки.
- `JSON.stringify(filter)` в queryKey: `employee-queries.ts:20,47` → передать `filter` объектом (TanStack Query делает structural sharing).
- Ручные `refetch()` в `competencies-select.tsx:65` (при каждом открытии поповера) и `:164` (после создания тега — избыточен, `useCreateTag.onSuccess` уже инвалидирует).

### 3.2 Типы (фронт vs бэк)

- `EmployeeDetailAdminResponse`: нет `created_by`, `personal_phone`, `personal_email` (маппер ставит `emailPersonal: undefined`, `map-temployee-to-employee-data.ts:112-114`).
- `EmployeeShortResponse.competencies` — лишнее поле (`types.ts:126`), в `EmployeeBrief` его нет.
- Фиктивные поля вакансий: `Vacancy.photo/city/position/franchise` (`vacancy/model/types.ts:19-22`), `VacancyDetail.location/franchise/employmentDetails/responsibilities/competencies` (:33-37) — с бэка не приходят. `VacancyDetail.department` типизирован полным `Department` вместо `DepartmentBrief`.
- `DepartmentCreateDTO.short_name/description` (`org-structure/model/types.ts:18-19`) — уточнить у бэка, принимаются ли при создании.
- Инлайн-огрызок старого статуса: `add-tag-dialog.tsx:21` (`"working" | "vacation" | "sick" | "bizTrip"`).

### 3.3 Мёртвый код (подтверждено knip 20.07)

- **Файлы:** `entities/org-structure/api/index.ts`, `features/create-employee/model/constants.ts`, `features/create-employee/utils/index.ts`, `features/create-employee/utils/map-employee-to-form-values.ts`, `shared/ui/table/index.ts`.
- **Символы:** `mapTEmployeeToEmployeeData`, `SelectedEmployee` (+`selected-employee.tsx`), `useTagsWithEmployees`, `getTagDetailApi`, `useDialogState`, `validateEmail`/`validatePhone`, `COMPETENCY_OPTIONS`, `competenciesSchema`, `normalizeVacancy`, `useDraggableRow`/`useDraggableList`/`usePreventDialogClose`.
- **Barrel-экспорты без потребителей:** `favorites/index.ts` (favoritesApi, favoritesKeys, все типы), `org-structure/index.ts` (OrgItem, summaryKeys, useCreateDepartment, DTO-типы), `tags/index.ts` (все `*Api`), `features/employee/index.ts` (3 диалога, statusFilterOptions, типы).
- **Мок-фолбэк:** `shortEmployees` (`entities/employee/model/mock.ts`) используется в `create-direction-modal.tsx:7,20,124` и `edit-direction-modal.tsx:7,24,163` — убрать фолбэк и удалить файл.
- **16 неиспользуемых SVG** в `shared/assets/icons/`: arrow-back, burger, change, clock, duplicate, google-drive, link-2, minus, more-horizontal, more-thick, new-employee, remove-employee, **crm, notifications, out, restore** (4 новых).

### 3.4 Зависимости

- `typescript-eslint` (meta) — unused (`package.json:61`).
- Не объявлены в package.json (unlisted, резолвятся транзитивно): `@radix-ui/react-label`, `@radix-ui/react-select`, `@radix-ui/react-slot`, `pdfjs-dist`.

---

## 4. 🟢 Backend-интеграция / в работе (ждут решения)

| Задача | Состояние |
|---|---|
| Admin CRUD вакансий (`/admin/vacancies/`) | Не реализован, есть только публичные GET |
| `POST/PATCH /org-structure/image/` | Не реализовано: кнопка «Обновить структуру» без `onClick` (`upload-org-structure.tsx:113-118`) |
| `POST /employees/{id}/report-inaccuracy/` | Mailto-заглушка (`report-inaccuracy-modal.tsx:21-26`) |
| `/admin/favorites/` (с заметками) | Не реализовано |
| Экспорт в Excel (`/admin/employees/export/`, `/admin/vacancies/export/`), `bulk-action` | Не реализовано |
| Отклик на вакансию | Только store + нотификация «В разработке» (`vacancy-card.tsx:66-73`); `features/vacancy-respond` — 10 строк zustand, кандидат на перенос в `entities/vacancy` |
| Страницы-заглушки `/settings`, `/projects`, `/help` | «В работе...» (поиск из шапки убран, eb3eed7) |
| `GET /directions/` | Не используется (directions выводятся из дерева локально) |

---

## 5. Сводка

- **Закрыто с 10.07:** ~15 пунктов (дубли виджетов, моки, birthdays, глобальный staleTime, фото API, статусы, поиск).
- **Открыто:** 4 критичных блока (п. 2) и ~15 средних (п. 3) + 9 задач backend-интеграции (п. 4).
- **Новое, чего не было в старых анализах:** неинвалидируемые ключи `employees-infinite`/`departments-list`; баг `leaderPosition` в карточке руководителя; 5 новых мёртвых файлов по knip; 4 новые неиспользуемые иконки.
- **Быстрые wins:** влить передачу `role` из ветки `fix/delete_tab` (2.2), удалить мёртвые файлы/символы/иконки (3.3), `enabled` по вкладкам (2.2), ref-флаг для URL-params (3.1).
