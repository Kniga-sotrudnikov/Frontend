# Сборка и деплой

## Production-сборка

```bash
npm run build    # tsc -b (type-check) + vite build → dist/
npm run preview  # локальный предпросмотр собранного бандла
```

Сборка сначала прогоняет строгую проверку типов TypeScript — ошибка типов
ломает сборку. Результат складывается в `dist/`.

В production запросы к API идут напрямую по `VITE_API_URL`
(прокси из `vite.config.ts` работает только в dev).

## CI/CD

Workflows в `.github/workflows/`:

### `check.yaml` — проверка Pull Request

- Триггер: PR в `main` / `develop`.
- Шаги: `npm ci` → `npm run build`.

### `deploy.yaml` — деплой

- Триггер: push в `develop` или `devops/test-deploy-develop`.
- Шаги: `npm ci` → `npm run build` → копирование `dist/` на сервер через SCP
  (`appleboy/scp-action`).

### Секреты и переменные GitHub

| Имя               | Тип       | Назначение                     |
| ----------------- | --------- | ------------------------------ |
| `VITE_API_URL`    | `vars`    | базовый URL бэкенда для сборки |
| `SSH_DEPLOY_HOST` | `vars`    | хост сервера для деплоя        |
| `SSH_DEPLOY_USER` | `secrets` | SSH-пользователь               |
| `SSH_DEPLOY_KEY`  | `secrets` | приватный SSH-ключ             |

> `VITE_API_URL` подставляется в бандл на этапе сборки — смена значения
> требует пересборки, а не только перезапуска сервера.
