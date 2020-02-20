/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * @author Philipp Beau <philipp@dathuis.nl>
 *
 */

/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app/entry',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'DatHuis application',
      inject: false,
      hash: true,
      template: require('html-webpack-template'),
      appMountId: 'app',
      lang: 'nl',
    }),
  ],
};
