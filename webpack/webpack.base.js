const path = require('path');
const appPath = require('../utils/path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const resolveRelativeAppRoot = require('../utils/resolvePath').resolveRelativeAppRoot;

const devMode = process.env.MODE_ENV == 'development';

function getName(filename)  {
  const { name, ext } = path.parse(filename);
  return !ext ? name : getName(name);
};
  
const styledComponentsTransformer = createStyledComponentsTransformer({
  getDisplayName: (filename, bindingName) => getName(filename) + '-' + bindingName,
});

const config = {
  context: appPath.root,
  output: {
    path: `${appPath.dist}`,
  },
  entry: {
    server: appPath.serverAppTs,
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: ['.ts', '.tsx', '.js'],
  },
  performance: {
    hints: devMode ? false : 'warning',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          name(module, chunks, cacheGroupKey) {
            return cacheGroupKey;
          },
        },
      },
    },
    minimizer: [!devMode && new CssMinimizerPlugin(), !devMode && '...'].filter(Boolean)
  },
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              getCustomTransformers: () => ({
                before: [styledComponentsTransformer],
              }),
            },
          },
          'stylelint-custom-processor-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|svg|ttf)$/i,
        loader: 'file-loader',
      },
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: devMode,
      formatter: 'basic',
      eslint: {
        files: resolveRelativeAppRoot('src/**/*.{ts,tsx}'),
      },
    }),
    devMode && new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/,
      failOnError: false,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
  ].filter(Boolean)
};

module.exports = config;