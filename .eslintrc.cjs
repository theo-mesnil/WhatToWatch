module.exports = {
  root: true,
  extends: [
    '@react-native',
    'plugin:typescript-sort-keys/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended'
  ],
  plugins: [
    'import',
    'sort-destructure-keys',
    'eslint-plugin-prettier',
    'formatjs'
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    'comma-dangle': ['error', 'never'],
    'import/no-default-export': ['off'],
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
          { pattern: 'theme', group: 'internal' },
          { pattern: 'types/**', group: 'internal' },
          { pattern: 'utils/**', group: 'internal' }
        ],
        pathGroupsExcludedImportTypes: ['react']
      }
    ],
    'no-console': 'warn',
    'react/jsx-indent-props': [2, 2],
    'react/react-in-jsx-scope': 'off',
    'sort-destructure-keys/sort-destructure-keys': [
      'warn',
      { caseSensitive: false }
    ],
    'sort-imports': [
      'warn',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single']
      }
    ],
    '@typescript-eslint/no-shadow': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'import/no-duplicates': 2,
    '@typescript-eslint/consistent-type-imports': ['error'],
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 2,
    'react-native/no-single-element-style-arrays': 2,
    'formatjs/enforce-id': [
      'error',
      {
        idInterpolationPattern: '[sha512:contenthash:base64:6]'
      }
    ]
  },
  overrides: [
    {
      // Test files only
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react']
    }
  ],
  settings: {
    'import/resolve': {
      moduleDirectory: ['node_modules', 'src']
    }
  },
  ignorePatterns: ['src/api/types.d.ts']
};
