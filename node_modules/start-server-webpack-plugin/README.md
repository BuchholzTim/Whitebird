# start-server-webpack-plugin

> Automatically start your server once Webpack's build completes.

[![travis build](https://img.shields.io/travis/ericclemmons/start-server-webpack-plugin.svg)](https://travis-ci.org/ericclemmons/start-server-webpack-plugin)
[![version](https://img.shields.io/npm/v/start-server-webpack-plugin.svg)](http://npm.im/start-server-webpack-plugin)
[![downloads](https://img.shields.io/npm/dm/start-server-webpack-plugin.svg)](http://npm-stat.com/charts.html?package=start-server-webpack-plugin)
[![MIT License](https://img.shields.io/npm/l/start-server-webpack-plugin.svg)](http://opensource.org/licenses/MIT)

### Installation

```shell
$ npm install --save-dev start-server-webpack-plugin
```

### Usage

In `webpack.config.server.babel.js`:

```js
import StartServerPlugin from "start-server-webpack-plugin";

export default {
  // This script will be ran after building
  entry: {
    server: ...
  },
  ...
  plugins: [
    ...
    // Only use this in DEVELOPMENT
    new StartServerPlugin({
      name: 'server.js',
      nodeArgs: ['--inspect'], // allow debugging
      args: ['scriptArgument1', 'scriptArgument2'], // pass args to script
      signal: false | true | 'SIGUSR2', // signal to send for HMR (defaults to `false`, uses 'SIGUSR2' if `true`)
      keyboard: true | false, // Allow typing 'rs' to restart the server. default: only if NODE_ENV is 'development'
    }),
    ...
  ],
  ...
}
```

The `name` argument in `new StartServerPlugin(name)` refers to the built asset, which is named by the output options of webpack (in the example the entry `server` becomes `server.js`. This way, the plugin knows which entry to start in case there are several.

If you don't pass a name, the plugin will tell you the available names.

You can use `nodeArgs` and `args` to pass arguments to node and your script, respectively. For example, you can use this to use the node debugger.

To use Hot Module Reloading with your server code, set Webpack to "hot" mode and include the `webpack/hot/poll` or `webpack/hot/signal` modules. Make sure they are part of your server bundle, e.g. if you are using `node-externals` put them in your whitelist. The latter module requires the `signal` option.

### License

> MIT License 2016 © Eric Clemmons
