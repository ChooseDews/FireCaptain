var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.config.dev.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var _ = require('lodash');
var embedFileSize = 50000;

module.exports = _.extend({}, config, {
  entry: [
    path.join(__dirname, '../src/main.js')
  ],
  output: {
    path: path.join(__dirname, '../dist/'),
    filename: '[name]-[hash].min.js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/index.html'),
      inject: 'body',
      filename: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      '__DEV__': JSON.stringify(false)
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.json?$/,
        loader: 'json'
      }
    ]
  },
});
