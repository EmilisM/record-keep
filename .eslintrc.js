module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['import', 'prettier', 'react', 'react-hooks'],
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'prettier',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'styled-components',
            message: 'Please import from styled-components/macro.',
          },
        ],
        patterns: ['!styled-components/macro'],
      },
    ],
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true,
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
