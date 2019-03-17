const { resolve, join } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';
const dist = 'dist';
const pathsToClean = [`${dist}/*.*`];
const cleanOptions = {
  root: resolve(__dirname, '..'),
  exclude: [`${dist}/.gitignore`],
  verbose: true,
  dry: false
};
const plugins = [
  new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
  new CleanWebpackPlugin(pathsToClean, cleanOptions),
  new LodashModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
    template: join('src', 'index.html')
  }),
  new ExtractTextPlugin(join(dist, 'bundle.css'), {
    allChunks: true
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity
  }),
  new webpack.NamedModulesPlugin()
];
if (isProduction) {
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      },
      output: {
        comments: false
      }
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  );
} else {
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.HotModuleReplacementPlugin()
  );
}
module.exports = plugins;
