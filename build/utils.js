'use strict'
const fs = require('fs')
const path = require('path')
const config = require('../config')
const packageConfig = require('../package.json')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: options.isminimize,
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  function generateLoaders (loader, loaderOptions) {
    let loaders = [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    options.usePostCSS ? loaders.push(postcssLoader) : ''
    // Extract CSS when that option is specified
    // (which is the case during production build)

    if (!options.extract) {
      return ['vue-style-loader'].concat(loaders)
    } else {
      return loaders
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass')
  }
}

exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)
  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: options.extract ? [MiniCssExtractPlugin.loader, loader[0]] : loader
    })
  }

  output.push({
    test: /\.vue$/,
    use: [
      {
        loader: 'vue-loader',
        options: {
          loaders: exports.cssLoaders({
            sourceMap: false,
            extract: options.extract,
            isminimize: options.isminimize
          })
        }
      }]
  })

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || ''
    })
  }
}
