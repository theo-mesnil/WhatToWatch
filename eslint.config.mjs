import eslint from '@eslint/js'
import expolint from 'eslint-config-expo/flat.js'
import perfectionist from 'eslint-plugin-perfectionist'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import { globalIgnores } from 'eslint/config'
import { config, configs } from 'typescript-eslint'

export default config(
  eslint.configs.recommended,
  configs.recommended,
  expolint,
  eslintPluginPrettierRecommended,
  perfectionist.configs['recommended-natural'],
  globalIgnores([
    '.expo/*',
    'dist/*',
    'android/*',
    'ios/*',
    'web-build/*',
    'node_modules/*',
    'coverage/*',
    'src/locales/*',
    'src/api/types.d.ts',
    'expo-env.d.ts',
  ]),
  {
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          fixStyle: 'separate-type-imports',
          prefer: 'type-imports',
        },
      ],
      'no-console': 'error',
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
