# Frontend

React + Vite + TypeScript. 
Архитектура — [Feature-Sliced Design](https://feature-sliced.design/) 
(слои и правила импортов зафиксированы в ESLint).

## Запуск

Требования: **Node.js**  и **npm**.

```bash
npm install
npm run dev
```

Сборка и предпросмотр продакшен-бандла:

```bash
npm run build
npm run preview
```

Полезные команды:

- `npm run lint` — ESLint (в т.ч. границы FSD)
- `npm run format` / `npm run format:check` — Prettier

Алиас импортов: `@/` → это начало `src/` (см. `vite.config.ts`).

## FSD: слои и импорты

Слои сверху вниз: **app → pages → widgets → features → entities → shared**.

- **Нижний слой не тянет верхний** (например, `shared` не импортирует `entities` / `features` / … / `app`).
- **Слайсы одного слоя не импортируют друг друга** — только `shared`, слои ниже или код внутри своего слайса.
- В проекте имена файлов в `src/**` для `.ts`/`.tsx` — **kebab-case** (правило ESLint).

Публичный API слайса — через **`index.ts`** в корне слайса; глубокие импорты из чужих слайсов по смыслу FSD нежелательны (детали — в `eslint.boundaries.config.cjs` и документации FSD).
