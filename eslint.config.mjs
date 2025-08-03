import eslint from '@eslint/js'
import pluginQuery from '@tanstack/eslint-plugin-query'
import expolint from 'eslint-config-expo/flat.js'
import formatjs from 'eslint-plugin-formatjs'
import perfectionist from 'eslint-plugin-perfectionist'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import { config, configs } from 'typescript-eslint'

export default config(
  eslint.configs.recommended,
  configs.recommended,
  eslintPluginPrettierRecommended,
  ...expolint,
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
    plugins: {
      '@tanstack/query': pluginQuery,
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
  }
)
