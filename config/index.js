'use strict'
const path = require('path')

module.exports = {
  doc_build: {
    entry: path.join(__dirname, '../doc/main.js'),
    output: path.resolve(__dirname, '../doc/dist'),
    extract: true,
    sourceMap: true,
    usePostCSS: true,
    isminimize: true,
    devtool: 'source-map',
    template: path.join(__dirname, '../doc/index.html'),
    autoprefixer: true
  },
  doc_dev: {
    entry: path.join(__dirname, '../doc/main.js'),
    output: path.join(__dirname, '../doc'),
    devtool: 'cheap-module-eval-source-map',
    template: path.join(__dirname, '../doc/index.html'),
    host: '0.0.0.0', // can be overwritten by process.env.HOST
    port: 7000, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    assetsPublicPath: '/',
    proxyTable: {

    },
    extract: false,
    sourceMap: true,
    usePostCSS: true,
    isminimize: false,
    errorOverlay: true,
    notifyOnErrors: true,
    assetsSubDirectory: 'static',
  },
  demo_build: {
    entry: path.join(__dirname, '../demo/main.js'),
    output: path.resolve(__dirname, '../demo/dist'),
    extract: true,
    sourceMap: true,
    usePostCSS: true,
    isminimize: true,
    devtool: 'source-map',
    template: path.join(__dirname, '../demo/index.html'),
    autoprefixer: true
  },
  demo_dev: {
    entry: path.join(__dirname, '../demo/main.js'),
    output: path.join(__dirname, '../demo'),
    devtool: 'cheap-module-eval-source-map',
    template: path.join(__dirname, '../demo/index.html'),
    host: '0.0.0.0', // can be overwritten by process.env.HOST
    port: 8000,
    assetsPublicPath: '/',
    proxyTable: {

    },
    extract: false,
    sourceMap: true,
    usePostCSS: true,
    isminimize: false,
    errorOverlay: true,
    notifyOnErrors: true
  }
}
