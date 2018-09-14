'use strict'
const path = require('path')
const { getLocalIp } = require('./utils')

module.exports = {
  doc_build: {
    entry: path.join(__dirname, '../doc/main.js'),
    output: path.resolve(__dirname, '../doc/dist/doc'),
    extract: true,
    sourceMap: true,
    usePostCSS: true,
    isminimize: false,
    devtool: 'source-map',
    template: path.join(__dirname, '../doc/index.html'),
    autoprefixer: true,
    assetsSubDirectory: path.join(__dirname, '../doc/dist/doc/static'),
    fromDirectory: path.join(__dirname, '../doc/static')
  },
  doc_dev: {
    entry: path.join(__dirname, '../doc/main.js'),
    output: path.join(__dirname, '../doc'),
    devtool: 'cheap-module-eval-source-map',
    template: path.join(__dirname, '../doc/index.html'),
    host: getLocalIp(), // can be overwritten by process.env.HOST
    port: 4000, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    assetsPublicPath: '/',
    proxyTable: {

    },
    extract: false,
    sourceMap: true,
    usePostCSS: true,
    isminimize: false,
    errorOverlay: true,
    notifyOnErrors: true,
    assetsSubDirectory: path.join(__dirname, '../doc/static'),
    fromDirectory: path.join(__dirname, '../doc/static')
  },
  demo_build: {
    entry: path.join(__dirname, '../demo/main.js'),
    output: path.resolve(__dirname, '../demo/dist/demo'),
    extract: true,
    sourceMap: true,
    usePostCSS: true,
    isminimize: true,
    devtool: 'source-map',
    template: path.join(__dirname, '../demo/index.html'),
    autoprefixer: true,
    assetsSubDirectory: path.join(__dirname, '../demo/dist/demo/static'),
    fromDirectory: path.join(__dirname, '../demo/static')
  },
  demo_dev: {
    entry: path.join(__dirname, '../demo/main.js'),
    output: path.join(__dirname, '../demo'),
    devtool: 'cheap-module-eval-source-map',
    template: path.join(__dirname, '../demo/index.html'),
    host: getLocalIp(), // can be overwritten by process.env.HOST
    port: 5000,
    assetsPublicPath: '/',
    proxyTable: {

    },
    extract: false,
    sourceMap: true,
    usePostCSS: true,
    isminimize: false,
    errorOverlay: true,
    notifyOnErrors: true,
    assetsSubDirectory: path.join(__dirname, '../demo/static'),
    fromDirectory: path.join(__dirname, '../demo/static')
  }
}
