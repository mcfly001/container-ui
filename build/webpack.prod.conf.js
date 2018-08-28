'use strict'
const path = require('path')
const unils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  entry: path.join(__dirname, '../doc/main.js'),
  output: {
    path: path.resolve(__dirname, '../doc/dist'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              loaders: {
                scss: [
                  'vue-style-loader',
                  MiniCssExtractPlugin.loader,
                  'css-loader',
                  'sass-loader'
                ],
                css: [
                  'vue-style-loader',
                  MiniCssExtractPlugin.loader,
                  'css-loader'
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,

            {
              "loader":"css-loader",
              "options":{
                "minimize":false,
                "sourceMap":true
              }
            },
            {
              "loader":"postcss-loader",
              "options":{
                "sourceMap":true
              }
            },
          {
            "loader":"sass-loader",
            "options":{
              "sourceMap":true
            }
          },

          // 'css-loader',
          // 'sass-loader',
          // 'postcss-loader'
        ]
      },
    ]
  },
  devtool: '#source-map',
  plugins: [
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css\.*(?!.*map)/g,
      cssProcessorOptions: {
        autoprefixer: false
      },
      canPrint: true
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'doc/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    })
  ]
})

module.exports = webpackConfig

