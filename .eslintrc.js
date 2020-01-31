module.exports = {
    root: true,
    env: {
      browser: true,
      amd: true,
      node: true
    },
    ignorePatterns: ['node-modules/'],
    parser: '@typescript-eslint/parser',
    plugins: [
      '@typescript-eslint',
      'react'
    ],
    rules: {
      "react/prop-types": [0],
      '@typescript-eslint/no-non-null-assertion': [0]
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended'
    ],
    settings: {
        react: {
          version: 'detect'
        }
    }
  };