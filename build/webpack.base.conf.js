const path = require('path')
const env = process.env.NODE_ENV

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
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
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'vue-loader'
          },
          {
            loader: 'vue-markdown-loader/lib/markdown-compiler',
            options: {
              raw: true,
              preprocess: function (MarkdownIt, Source) {
                MarkdownIt.renderer.rules.table_open = function () {
                  return '<div class="table-container"><table class="table">'
                }
                MarkdownIt.renderer.rules.table_close = function () {
                  return '</table></div>'
                }
                return Source
              }
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'urlConfig': path.resolve(__dirname, '../config/' + env + '.js')
    }
  },
  performance: {
    hints: false
  }
}

