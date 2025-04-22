import eslint from '@eslint/js'
import { config, configs } from 'typescript-eslint'
import expolint from 'eslint-config-expo/flat.js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import { globalIgnores } from 'eslint/config'

export default config(
  eslint.configs.recommended,
  configs.recommended,
  expolint,
  eslintPluginPrettierRecommended,
  globalIgnores([
    '.expo/*',
    'dist/*',
    'android/*',
    'ios/*',
    'web-build/*',
    'node_modules/*',
    'coverage/*',
    'src/locales/*',
  ])
)
