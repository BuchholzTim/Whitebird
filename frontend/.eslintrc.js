module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended',
    'prettier/vue',
    'plugin:prettier/recommended',
    'airbnb-base',
  ],
  plugins: ['prettier', 'unused-imports'],
  rules: {
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'no-console': 'warn',
    'no-debugger': 'warn',
    eqeqeq: 'error',
    quotes: [2, 'single', { avoidEscape: true }],
    'linebreak-style': 0,
    'prettier/prettier': 0,
    'operator-linebreak': ['error', 'after'],
    'import/no-unresolved': 'off', // Conflicts With Nuxt-Shortcut-Imports @,~,
    'import/extensions': 'off', // Conflicts with Nuxt
    'no-underscore-dangle': 'off', // Conflicts with MongoDB
    'no-param-reassign': 'off', // Conflicts often with fabricJS
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
  globals: {
    $nuxt: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
  },
};
