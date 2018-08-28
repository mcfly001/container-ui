'use strict'
const path = require('path')

module.exports = {
  doc_build: {
    host: '0.0.0.0', // can be overwritten by process.env.HOST
    port: 7000, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    assetsPublicPath: '/',
    proxyTable: {

    },
    usePostCSS: true,
    poll: false,
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    cssSourceMap: true,
    devtool: 'cheap-module-eval-source-map',
    assetsSubDirectory: 'static',

    // path
    assetsRoot: path.resolve(__dirname, '../doc/dist')

  },
  doc_dev: {
    host: '0.0.0.0', // can be overwritten by process.env.HOST
    port: 9000, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    assetsPublicPath: '/',
    proxyTable: {

    },
    usePostCSS: true,
    poll: false,
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    cssSourceMap: true,
    devtool: 'cheap-module-eval-source-map',
    assetsSubDirectory: 'static',
  },
  demo_build: {
    entry: path.join(__dirname, '../doc/main.js'),
    template: 'doc/index.html',
    // path
    assetsRoot: path.resolve(__dirname, '../demo/dist'),
    assetsPublicPath: '/',
    sourceMap: true,
    productionSourceMap: false,
    devtool: true
  },
  demo_dev: {
    entry: path.join(__dirname, '../demo/main.js'),
    template: 'demo/index.html',
    // path
    assetsRoot: path.resolve(__dirname, '../demo/dist'),
    assetsPublicPath: '/',
    sourceMap: true,
    productionSourceMap: false,
    devtool: true
  }
}
