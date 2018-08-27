'use strict'
const unils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  entry: path.join(__dirname, '../doc/main.js'),
  output: {
    path: path.resolve(__dirname, '../doc'),
    filename: 'index.js'
  },
  devtool: 'cheap-module-eval-source-map',
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
          'css-loader',
          'sass-loader',
          'postcss-loader'
        ]
      },
    ]
  },
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.demo_dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    compress: true,
    host: HOST || (isdemoDev ? config.demo_dev.host : config.doc_dev.host),
    port: PORT || (isdemoDev ? config.demo_dev.port : config.doc_dev.port),
    open: true,
    overlay: config.demo_dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.demo_dev.assetsPublicPath,
    proxy: isdemoDev ? config.demo_dev.proxyTable : config.doc_dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: isdemoDev ? config.demo_dev.poll : config.doc_dev.poll,
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: isdemoDev ? 'demo/index.html' : 'doc/index.html',
      inject: true
    })
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || (isdemoDev ? config.demo_dev.port : config.doc_dev.port)
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: (isdemoDev ? config.demo_dev.notifyOnErrors : config.doc_dev.notifyOnErrors)
          ? utils.createNotifierCallback()
          : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
