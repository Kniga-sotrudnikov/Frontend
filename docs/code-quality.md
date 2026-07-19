# Качество кода: линтинг, форматирование, тесты

## ESLint

Конфиг — `.eslintrc.cjs`. Запуск: `npm run lint`.

- База: `eslint:recommended`, `@typescript-eslint/recommended`,
  `import/recommended`, `react-hooks/recommended`, `prettier`.
- Плагины:
  - `boundaries` — контроль FSD-границ слоёв и слайсов
    (настройки в `eslint.boundaries.config.cjs`);
  - `check-file` — имена файлов в `src/**` (`kebab-case` для `.ts`/`.tsx`/`.css`);
  - `import` — порядок и корректность импортов;
  - `react-hooks` — в т.ч. `react-hooks/exhaustive-deps: error`;
  - `react-refresh` — `only-export-components: warn` (`allowConstantExport: true`).
- Игнорируются: `dist`, `node_modules`, `*.config.*`, `package-lock.json`.

Нарушение FSD-правил импортов — это ошибка линтера, а не договорённость:
перед коммитом `npm run lint` должен проходить.

## Prettier

Конфиг `.prettierrc` пустой — настройки по умолчанию.

- `npm run format` — отформатировать весь проект;
- `npm run format:check` — только проверка.

ESLint и Prettier не конфликтуют: `eslint-config-prettier` отключает
форматирующие правила ESLint.

## Husky

`pre-commit` хук (`.husky/`) запускает `npm run lint`.
Хуки устанавливаются автоматически при `npm install` (скрипт `prepare`).

## Тесты

Тест-раннер — **Vitest** (`npm run test`, по умолчанию watch-режим).

На данный момент тестовых файлов в проекте нет. Если добавляешь тесты:

- размещай рядом с тестируемым кодом (`*.test.ts` / `*.test.tsx`);
- используй существующие алиасы импортов (`@/`, `@ui/`, `@icons/`);
- для разового прогона без watch-режима: `npx vitest run`.
