/* eslint-env node */
/**
 * FSD слои (сверху → вниз): app → pages → widgets → features → entities → shared.
 * - нижний слой не тянет верхний;
 * - слайсы одного слоя не тянут друг друга (только shared / ниже / внутри слайса);
 *
 * Public API слайса (только index.ts)
 */

/** @type {import('eslint').Linter.Config['settings']} */
const settings = {
  "import/resolver": {
    typescript: {
      alwaysTryTypes: true,
      project: "./tsconfig.app.json",
    },
    node: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
  },
  "boundaries/elements": [
    { type: "app", pattern: "src/app/**/*", mode: "full" },
    {
      type: "pages",
      pattern: "src/pages/*",
      mode: "folder",
      capture: ["slice"],
    },
    {
      type: "widgets",
      pattern: "src/widgets/*",
      mode: "folder",
      capture: ["slice"],
    },
    {
      type: "features",
      pattern: "src/features/*",
      mode: "folder",
      capture: ["slice"],
    },
    {
      type: "entities",
      pattern: "src/entities/*",
      mode: "folder",
      capture: ["slice"],
    },
    { type: "shared", pattern: "src/shared/**/*", mode: "full" },
  ],
};

/**
 * @type {import('eslint').Linter.Config['rules']}
 */
const rules = {
  "boundaries/dependencies": [
    "error",
    {
      default: "allow",
      message:
        "Импорт нарушает FSD: {{from.type}} → {{to.type}} (проверь слой и public API слайса).",
      rules: [
        {
          allow: {
            dependency: {
              relationship: { to: "internal" },
            },
          },
        },
        {
          from: { type: ["pages", "widgets", "features", "entities"] },
          disallow: {
            dependency: { relationship: { to: "sibling" } },
          },
          message:
            "Слайсы одного слоя не импортируют друг друга; используй shared или слой ниже.",
        },
        {
          from: { type: "shared" },
          disallow: {
            to: {
              type: ["app", "pages", "widgets", "features", "entities"],
            },
          },
          message: "shared не может зависеть от верхних слоёв.",
        },
        {
          from: { type: "entities" },
          disallow: {
            to: { type: ["app", "pages", "widgets", "features"] },
          },
          message:
            "entities может импортировать только shared и другие модули entities (не cross-slice).",
        },
        {
          from: { type: "features" },
          disallow: {
            to: { type: ["app", "pages", "widgets"] },
          },
          message: "features не импортирует app, pages, widgets.",
        },
        {
          from: { type: "widgets" },
          disallow: {
            to: { type: ["app", "pages"] },
          },
          message: "widgets не импортирует app и pages.",
        },
        {
          from: { type: "pages" },
          disallow: {
            to: { type: ["app"] },
          },
          message: "pages не импортирует app.",
        },
      ],
    },
  ],

  "boundaries/no-unknown-files": "error",

  "check-file/filename-naming-convention": [
    "error",
    {
      "src/app/**/*.{ts,tsx}": "KEBAB_CASE",
      "src/pages/**/*.{ts,tsx}": "KEBAB_CASE",
      "src/widgets/**/*.{ts,tsx}": "KEBAB_CASE",
      "src/features/**/*.{ts,tsx}": "KEBAB_CASE",
      "src/entities/**/*.{ts,tsx}": "KEBAB_CASE",
      "src/shared/**/*.{ts,tsx}": "KEBAB_CASE",
    },
  ],
};

module.exports = { settings, rules };
