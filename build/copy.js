'use strict'
const path = require('path')
const webpack = require('webpack')
const utils = require('./utils')

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules|\.git|dist/,
        options: {
          presets: ['es2015', 'stage-2'],
          cacheDirectory: true
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'url-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        loader: "url-loader",
        options: {
          name: '[name].[ext]',
          limit: 8192
        }
      },
      {
        test: /\.md$/,
        loader: 'vue-markdown-loader',
        options: {
          preprocess: function (MarkdownIt, Source) {
            MarkdownIt.renderer.rules.table_open = function () {
              return '<div class="table-container"><table class="table">';
            };
            MarkdownIt.renderer.rules.table_close = function () {
              return '</table></div>'
            };
            return Source
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.join(__dirname, '../demo')
    }
  }
}

