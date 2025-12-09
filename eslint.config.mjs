import eslint from '@eslint/js'
import pluginQuery from '@tanstack/eslint-plugin-query'
import expo from 'eslint-plugin-expo'
import formatjs from 'eslint-plugin-formatjs'
import perfectionist from 'eslint-plugin-perfectionist'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import reactHooks from 'eslint-plugin-react-hooks'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import tslint from 'typescript-eslint'

export default defineConfig([
  eslint.configs.recommended,
  tslint.configs.recommended,
  reactHooks.configs.flat.recommended,
  eslintPluginPrettierRecommended,
  perfectionist.configs['recommended-natural'],
  {
    ignores: [
      '.expo/*',
      'dist/*',
      'android/*',
      'ios/*',
      'web-build/*',
      'node_modules/*',
      'coverage/*',
      'src/locales/*',
      'src/api/types.d.ts',
      'src/api/type-v4.d.ts',
      'expo-env.d.ts',
    ],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        __DEV__: 'readonly',
        alert: false,
        cancelAnimationFrame: false,
        cancelIdleCallback: false,
        clearImmediate: false,
        ErrorUtils: false,
        fetch: false,
        FormData: false,
        navigator: false,
        process: false,
        requestAnimationFrame: false,
        requestIdleCallback: false,
        setImmediate: false,
        'shared-node-browser': true,
        window: false,
        XMLHttpRequest: false,
      },
    },
    plugins: {
      '@tanstack/query': pluginQuery,
      expo,
      formatjs,
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          fixStyle: 'separate-type-imports',
          prefer: 'type-imports',
        },
      ],
      '@typescript-eslint/no-unused-vars': 'error',
      'formatjs/enforce-id': [
        'error',
        {
          idInterpolationPattern: '[sha512:contenthash:base64:6]',
        },
      ],
      'no-console': 'error',
      'no-unused-vars': 'off',
      'perfectionist/sort-imports': [
        'warn',
        {
          groups: [
            ['builtin-type', 'builtin'],
            ['external-type', 'external'],
            ['internal-type', 'internal'],
            ['parent-type', 'parent', 'sibling-type', 'sibling', 'index-type', 'index'],
            'object',
            'unknown',
          ],
        },
      ],
    },
  },
])
