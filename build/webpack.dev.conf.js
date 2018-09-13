'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const { getLocalIp } = require('../config/utils')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const env = process.env.NODE_ENV

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  entry: config[env].entry,
  output: {
    path: config[env].output,
    filename: 'index.js'
  },
  devtool: config[env].devtool,
  module: {
    rules: utils.styleLoaders({
      extract: config[env].extract,
      sourceMap: config[env].sourceMap,
      usePostCSS: config[env].usePostCSS,
      isminimize: config[env].isminimize
    })
  },
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config[env].assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    compress: true,
    host: HOST || config[env].host,
    port: PORT || config[env].port,
    open: true,
    overlay: config[env].errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: '/',
    proxy: config[env].proxyTable,
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
      template: config[env].template,
      inject: true
    }),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      "localIp": JSON.stringify(getLocalIp())
    })
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config[env].port
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
        onErrors: config[env].notifyOnErrors
          ? utils.createNotifierCallback()
          : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
