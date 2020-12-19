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
  plugins: ['prettier'],
  rules: {
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': 'off',
    eqeqeq: 'error',
    quotes: [2, 'single', { avoidEscape: true }],
    'linebreak-style': 0,
    'prettier/prettier': 0,
    'operator-linebreak': ['error', 'after'],
    'import/no-unresolved': 'off', // Conflicts With Nuxt-Shortcut-Imports @,~,
    'import/extensions': 'off', // Conflicts with Nuxt
    'no-underscore-dangle': 'off', // Conflicts with MongoDB
  },
  globals: {
    $nuxt: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
  },
};
