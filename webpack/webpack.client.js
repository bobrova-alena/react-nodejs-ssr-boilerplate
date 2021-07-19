const baseConfig = require('./webpack.base');
const appPath = require('../utils/path');
const LoadablePlugin = require('@loadable/webpack-plugin');

const devMode = process.env.MODE_ENV == 'development';
const isDebugMode = process.env.DEBUG_ENV;
const isMobile = process.env.IS_MOBILE == 'mobilemode';

const entryPointName = isMobile? appPath.mobileAppName : appPath.webAppName; 
const entryPointPath = isMobile? appPath.mobileAppTsx : appPath.webAppTsx; 

const config = {
  ...baseConfig,
  entry: {
    [entryPointName]: entryPointPath
  },
  output: {
    ...baseConfig.output,
    publicPath: "/",
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].chunk.js'
  },
  target: 'web',  
  devtool: devMode ? 'inline-source-map' : 'source-map',
  plugins: baseConfig.plugins.concat([
    new LoadablePlugin({
      filename: `${isMobile? 'mobile': 'web'}-loadable-stats.json`
    }),
  ]),
};

if(isDebugMode) {
  console.log(config);
}

module.exports = config;