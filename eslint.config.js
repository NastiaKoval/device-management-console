import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { FlatCompat } from '@eslint/eslintrc';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'eslint.config.js'] },
  { languageOptions: { ecmaVersion: 2022, sourceType: 'module' } },
  js.configs.recommended,
  ...compat.extends('airbnb'),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [...tseslint.configs.strictTypeChecked],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: ['./tsconfig.app.json', './tsconfig.node.json'],
        },
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-explicit-any': 'error',
      // React event handlers commonly don't use the return value of async callbacks
      '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: { attributes: false } }],
      'react/react-in-jsx-scope': 'off',
      'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }],
      'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
      // TypeScript covers this; defaultProps are not needed with TS optional props
      'react/require-default-props': 'off',
      // RHF + MUI require spreading field/params — this pattern is intentional
      'react/jsx-props-no-spreading': 'off',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': 'error',
      'import/order': ['error', {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type'],
        pathGroups: [{ pattern: '@/**', group: 'internal' }],
        pathGroupsExcludedImportTypes: ['type'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      }],
      'import/extensions': ['error', 'ignorePackages', { ts: 'never', tsx: 'never' }],
      'import/no-extraneous-dependencies': ['error', {
        devDependencies: ['vite.config.ts', '**/*.test.ts', '**/*.spec.ts', '**/*.test.tsx', '**/*.spec.tsx'],
      }],
    },
  },
  {
    files: ['**/*.js'],
    extends: [tseslint.configs.disableTypeChecked],
  },
);
