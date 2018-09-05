require('shelljs/global');

const config = require('../config');
const ora = require('ora');
const webpack = require('webpack');
const webpackConfig = require('./webpack.prod.conf');
const env = process.env.NODE_ENV

const spinner = ora('building for production...');
spinner.start();

// 每次打包前先移除dist文件夹
rm('-rf', config[env].assetsRoot);

webpack(webpackConfig, function (err, stats) {
  spinner.stop();
  if (err) throw err;
  process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n')
});
