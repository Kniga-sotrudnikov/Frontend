# Архитектура: Feature-Sliced Design

Проект построен по методологии [Feature-Sliced Design](https://feature-sliced.design/).
Правила слоёв жёстко контролируются ESLint (`eslint.boundaries.config.cjs`),
поэтому нарушить их «молча» не получится — `npm run lint` упадёт.

## Слои

Сверху вниз:

```
app → pages → widgets → features → entities → shared
```

### Правила импортов

- **Нижний слой не импортирует верхний.** Например, `shared` не зависит ни от
  кого, `entities` — только от `shared`, `features` — от `entities` и `shared` и т.д.
- **Слайсы одного слоя не импортируют друг друга.** Например,
  `entities/employee` не может импортировать `entities/user`. Общая логика
  выносится в `shared` (или слой ниже).
- **Public API слайса** — через `index.ts` в корне слайса. Глубокие импорты
  из чужих слайсов нежелательны.

## Структура `src/`

```
src/
├── app/        инициализация приложения
│   ├── api/        перехватчики Axios (JWT, refresh, logout)
│   ├── providers/  провайдеры (TanStack Query и др.), layout провайдеров
│   ├── routes/     роутер, ProtectedRoute, GuestOnlyRoute
│   ├── styles/     глобальные стили, тема Tailwind, шрифты
│   ├── app.tsx     корневой layout приложения
│   └── main.tsx    точка входа
├── pages/      страницы (lazy-загрузка в роутере)
│   ├── employees/        список сотрудников, вакансий и избранного
│   ├── org-structure/    организационная структура
│   ├── projects/         проекты
│   ├── settings/         настройки
│   ├── help/             помощь
│   ├── login/            вход (только для неавторизованных)
│   ├── magic-login/      вход по магической ссылке
│   └── 404/              страница «не найдено»
├── widgets/    крупные самостоятельные блоки
│   ├── sidebar/                  боковая навигация
│   ├── navbar/                   верхняя навигация
│   ├── page-header/              шапка страницы
│   ├── header-user-card/         карточка текущего пользователя в шапке
│   ├── employees-list/           список сотрудников
│   ├── employees-filter-bar/     панель фильтров сотрудников
│   ├── employee-card/            карточка сотрудника
│   ├── employee-profile-dialog/  диалог профиля сотрудника
│   ├── employee-not-found/       заглушка «сотрудник не найден»
│   ├── vacancy-card/             карточка вакансии
│   ├── profession-card/          карточка профессии
│   ├── birthdays-popover/        поповер с днями рождения
│   └── edit-org-structure-modal/ модальное окно редактирования оргструктуры
├── features/   пользовательские сценарии
│   ├── auth/login-by-password/   вход по логину и паролю
│   ├── auth/login-by-link/       вход по магической ссылке
│   ├── create-employee/          создание сотрудника
│   ├── create-direction-modal/   создание направления (модалка)
│   ├── edit-direction-modal/     редактирование направления (модалка)
│   ├── employee/                 модальные окна сотрудника
│   ├── vacancy-respond/          отклик на вакансию (модалка)
│   └── upload-org-structure/     загрузка оргструктуры
├── entities/   бизнес-сущности
│   ├── employee/        сотрудник (api, model, ui, utils)
│   ├── user/            текущий пользователь, auth-стор (Zustand + persist)
│   ├── org-structure/   оргструктура (api, model, lib, ui)
│   ├── vacancy/         вакансия (api, model, hooks, lib)
│   ├── favorites/       избранное (api, model, hooks)
│   └── tags/            теги (api, model)
└── shared/     переиспользуемый код
    ├── api/      базовый Axios-клиент, обработка HTTP-ошибок, типы
    ├── ui/       UI-примитивы (button, input, dialog, table, popover, …)
    ├── lib/      cn, хуки, pluralize, валидация
    ├── model/    маршруты (routes.ts), глобальные сторы (уведомления)
    └── assets/   иконки (SVG как React-компоненты), изображения
```

## Алиасы импортов

Настроены в `tsconfig.app.json` и `vite.config.ts` (через `vite-tsconfig-paths`):

| Алиас      | Указывает на                |
| ---------- | --------------------------- |
| `@/*`      | `src/*`                     |
| `@ui/*`    | `src/shared/ui/*`           |
| `@icons/*` | `src/shared/assets/icons/*` |

Пример: `import { Button } from "@/shared/ui/button";`

## Соглашения

- **Имена файлов** в `src/**` для `.ts`/`.tsx`/`.css` — **kebab-case**
  (ESLint-правило `check-file/filename-naming-convention`).
- Страницы экспортируются как `Component` — для `lazy()` в роутере.
- Иконки — SVG-файлы, импортируются как React-компоненты через `vite-plugin-svgr`.
- Новая сущность/фича — новый слайс в соответствующем слое с `index.ts`
  в качестве public API.

## Типовая внутренняя структура слайса

```
entities/employee/
├── index.ts    public API слайса
├── api/        запросы к бэкенду
├── model/      типы, TanStack Query hooks, сторы
├── ui/         компоненты сущности
└── utils/      вспомогательные функции
```

Не каждый слайс обязан содержать все сегменты — добавляются по необходимости.
