'use strict'
const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const packageConfig = require('./package.json')
const name = packageConfig.name.replace('@2dfire/', '')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '',
    filename: 'index.js',
    library: `${name}`,
    libraryTarget: 'umd',
    umdNamedDefine: true
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
          'css-loader',
          'sass-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules|\.git|dist/,
        loader: 'babel-loader',
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
      }
    ]
  },
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
    new VueLoaderPlugin()
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 8,
          mangle: true
        },
        sourceMap: false
      })
    ]
  }
}
