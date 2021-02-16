// vetur.config.js
/** @type {import('vls').VeturConfig} */
module.exports = {
  // **optional** default: `{}`
  // override vscode settings
  // Notice: It only affects the settings used by Vetur.
  settings: {
    'vetur.useWorkspaceDependencies': true,
    'vetur.validation.template': false,
    'vetur.format.defaultFormatter.js': 'none',
    'vetur.format.defaultFormatter.ts': 'none',
    'vetur.experimental.templateInterpolationService': false,
    'vetur.validation.interpolation': false,
  },
  // **optional** default: `[{ root: './' }]`
  // support monorepos
  projects: [
    // shorthand for only root.
    {
      // **required**
      // Where is your project?
      // It is relative to `vetur.config.js`.
      root: './frontend/',
      // **optional** default: `'package.json'`
      // Where is `package.json` in the project?
      // We use it to determine the version of vue.
      // It is relative to root property.
      package: './package.json',
      // **optional** default: `'./.vscode/vetur/snippets'`
      // Where is vetur custom snippets folders?
      snippetFolder: './.vscode/vetur/snippets',
      // **optional** default: `[]`
      // Register globally Vue component glob.
      // If you set it, you can get completion by that components.
      // It is relative to root property.
      // Notice: It won't actually do it. You need to use `require.context` or `Vue.component`
      globalComponents: ['./components/**/*.vue'],
    },
  ],
};
