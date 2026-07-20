# Стили и UI-kit

## Tailwind CSS 4

Главный CSS-файл — `src/app/styles/index.css`. Используется Tailwind CSS 4
(плагин `@tailwindcss/vite`) с новым синтаксисом:

- `@import "tailwindcss"` — подключение Tailwind;
- `@theme inline` — дизайн-токены (брендовая палитра, типографика) на основе
  CSS-переменных из `:root`;
- `@utility` — кастомные утилиты.

Новые цвета и токены добавляй в `:root` + `@theme inline` в `index.css` —
после этого они доступны как обычные Tailwind-классы.

Шрифт **Montserrat** подключается в `src/app/styles/fonts.css`
(файлы в `src/app/styles/fonts/`).

Дополнительно подключены `shadcn/tailwind.css` и `tw-animate-css`.

## UI-kit: `src/shared/ui/`

Собственный набор примитивов (по мотивам shadcn/ui) поверх Radix UI:

- Базовые: `button`, `input`, `textarea`, `checkbox`, `badge`, `separator`, `skeleton`.
- Оверлеи: `dialog`, `popover`, `dropdown-menu`, `collapsible`.
- Данные: `table` (на `@tanstack/react-table`), `pagination`, `tabs`,
  `calendar` (на `react-day-picker`).
- Составные: `actions-group`, `add-tag-modal`, `checkbox-select`,
  `collapsible-badge-list`, `draggable-list`, `empty-placeholder`,
  `info-section`, `notification`, `report-inaccuracy-modal`,
  `zoom-control`, `zoomable-image`, `zoomable-pdf`.

Правила:

- Общий переиспользуемый компонент — в `shared/ui`, а не внутри слайса.
- Для склейки классов используй `cn` (`src/shared/lib/cn`) — обёртка над
  `clsx` + `tailwind-merge`.
- Варианты компонентов — через `class-variance-authority` (как в существующих
  примитивах).

## Иконки и изображения

- Иконки — SVG в `src/shared/assets/icons/`, импортируются как React-компоненты
  через `vite-plugin-svgr` (алиас `@icons/*`).
- Растровые изображения — `src/shared/assets/images/`.

## PDF и экспорт

- Просмотр PDF — `zoomable-pdf` на `react-pdf`.
- Экспорт в PDF — хук `use-export-pdf` (`src/shared/lib/hooks/`) на
  `html2canvas` + `jspdf`.

## Даты

`date-fns` + `react-day-picker` (компонент `calendar` в `shared/ui`).
Для склонений числительных — `pluralize` из `src/shared/lib`.
