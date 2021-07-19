const appPath = require('../utils/path');
const baseConfig = require('./webpack.base');
const NodemonPlugin = require('nodemon-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const isDebugMode = process.env.DEBUG_ENV;

const config = {
  ...baseConfig,
  name: 'server',
  entry: {
    server: appPath.serverAppTs,
  },
  output: {
    ...baseConfig.output,
    libraryTarget: 'commonjs2',
  },
  target: 'node',
  node: { __dirname: false },
  devtool: 'source-map',
  externals: [nodeExternals()],
  optimization: {
    ...baseConfig.optimization,
    nodeEnv: false
  },
  plugins: baseConfig.plugins.concat([
    new NodemonPlugin({
      watch: appPath.serverDist
    })
  ])
};

if(isDebugMode) {
  console.log(config);
}

module.exports = config;