module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['import', 'sort-destructure-keys'],
  parser: '@typescript-eslint/parser',
  rules: {
    'no-console': 'warn',
    'import/no-default-export': ['off'],
    'comma-dangle': ['error', 'never'],
    'no-unused-vars': [
      'error',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: false }
    ],
    'react/jsx-indent-props': [2, 2],
    'import/order': ['warn', { 'newlines-between': 'always' }],
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
    ]
  },
  settings: {
    'import/resolve': {
      moduleDirectory: ['node_modules', 'src']
    }
  }
};
