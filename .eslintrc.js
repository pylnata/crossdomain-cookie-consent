const aliases = require('./aliases')

module.exports = {
  env: {
    browser: true,
    es6: true,
    commonjs: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    parserOptions: {
      parser: 'babel-eslint',
    },
  },
  plugins: ['prettier', 'flowtype', 'import'],
  rules: {
    'arrow-parens': 2,
    'prettier/prettier': 'error',
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none',
        varsIgnorePattern: '.+Type$',
        ignoreRestSiblings: true,
      },
    ],
    'flowtype/require-valid-file-annotation': 2,
    'no-console': 'warn',
  },
  settings: {
    'import/resolver': {
      node: {},
      'babel-module': {
        alias: aliases,
      },
    },
  },
}
