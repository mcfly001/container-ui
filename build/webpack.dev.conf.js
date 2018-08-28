'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  entry: path.join(__dirname, '../doc/main.js'),
  output: {
    path: path.resolve(__dirname, '../doc'),
    filename: 'index.js'
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: utils.styleLoaders({
      extract: false,
      sourceMap: true,
      usePostCSS: true,
      isminimize: false
    })
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
    host: '0.0.0.0',
    port: '6060',
    open: true,
    overlay: config.demo_dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: '/',
    proxy: {

    },
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: false,
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'doc/index.html',
      inject: true
    }),
    new VueLoaderPlugin()
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || 6060
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
        onErrors: 1 === 1
          ? utils.createNotifierCallback()
          : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
