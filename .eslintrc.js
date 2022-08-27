module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['import', 'sort-destructure-keys'],
  parser: '@typescript-eslint/parser',
  rules: {
    'no-console': 'warn',
    'import/no-default-export': ['off'],
    'comma-dangle': ['error', 'never'],
    'react/jsx-indent-props': [2, 2],
    'import/order': [
      2,
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        },
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index'
        ],
        'newlines-between': 'always',
        pathGroups: [
          { pattern: 'api/**', group: 'internal' },
          { pattern: 'assets/**', group: 'internal', position: 'after' },
          { pattern: 'components/**', group: 'internal' },
          { pattern: 'constants/**', group: 'internal' },
          { pattern: 'contexts/**', group: 'internal' },
          { pattern: 'layouts/**', group: 'internal' },
          { pattern: 'navigation', group: 'internal' },
          { pattern: 'screens/**', group: 'internal' },
          { pattern: 'themes/**', group: 'internal' },
          { pattern: 'types/**', group: 'internal' },
          { pattern: 'utils/**', group: 'internal' }
        ],
        pathGroupsExcludedImportTypes: ['react']
      }
    ],
    'sort-imports': [
      'warn',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single']
      }
    ],
    'sort-destructure-keys/sort-destructure-keys': [
      'warn',
      { caseSensitive: false }
    ],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error']
  },
  settings: {
    'import/resolve': {
      moduleDirectory: ['node_modules', 'src']
    }
  }
};
