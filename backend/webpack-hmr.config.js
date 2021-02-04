/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
// https://github.com/nestjs/nest/issues/5706#issuecomment-732478369
const StartServerPlugin = require('start-server-nestjs-webpack-plugin');

module.exports = function(options) {
  return {
    ...options,
    entry: ['webpack/hot/poll?100', options.entry],
    watch: true,
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?100'],
      }),
    ],
    plugins: [
      ...options.plugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin({ paths: [/\.js$/, /\.d\.ts$/] }),
      new StartServerPlugin({ name: options.output.filename }),
    ],
  };
};
