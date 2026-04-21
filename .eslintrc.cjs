const boundaries = require('./eslint.boundaries.config.cjs')

module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'prettier',
    'plugin:react-hooks/recommended'
  ],
  ignorePatterns: ['dist', 'node_modules', '.eslintrc.cjs', 'package-lock.json'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'boundaries',
    'react-hooks',
    'react-refresh',
    'check-file'
  ],
  settings: {
    ...boundaries.settings,
    'import/resolver': {
      ...boundaries.settings['import/resolver'],
      typescript: {
        ...boundaries.settings['import/resolver'].typescript,
        project: './tsconfig.app.json'
      }
    }
  },
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      {
        allowConstantExport: true
      }
    ],
    'jsx-quotes': ['error', 'prefer-double'],
    'react-hooks/exhaustive-deps': 'error',
    'react-hooks/set-state-in-effect': 'off',
    ...boundaries.rules
  },
  overrides: [
    {
      files: ['**/*.d.ts'],
      rules: {
        'check-file/filename-naming-convention': 'off'
      }
    }
  ]
}
