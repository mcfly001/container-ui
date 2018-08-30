#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const demoRoute = require('../template/route/demoRoute')
const docRoute = require('../template/route/docRoute')
const packagesPath = path.join(__dirname, '../packages')
const packageName = process.argv.splice(2)[0]
const { copy } = require('fs-extra')
const { spawn } = require('child_process')
const currentPath = process.cwd() + '/packages'

// 重新生成路由
fs.readdir(packagesPath, function (err, files) {
  if(err){
    console.log(chalk.red('err', err))
  }
  if(!files.includes(packageName)){
    demoRoute(files.concat(packageName))
    docRoute(files.concat(packageName))
  }
  else{
    console.log(chalk.red('已存在同名包，请修改包名称'))
  }
})

const packageJson = `
{
  "name": "@2dfire/${packageName}",
  "version": "0.0.1",
  "description": "",
  "main": "dist/index.js",
  "author": {
    "name": "",
    "email": ""
  },
  "license": "ISC",
  "dependencies": {
    "vue": "^2.5.17"
  },
  "devDependencies": {
    "autoprefixer": "^8.3.0",
    "babel-core": "^6.0.0",
    "babel-loader": "^7.1.4",
    "babel-plugin-istanbul": "^4.1.6",
    "babel-plugin-syntax-jsx": "^6.18.0",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-plugin-transform-vue-jsx": "^3.7.0",
    "babel-preset-env": "^1.6.1",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-stage-2": "^6.24.1",
    "css-loader": "^0.25.0",
    "mini-css-extract-plugin": "^0.4.2",
    "node-sass": "^4.5.0",
    "optimize-css-assets-webpack-plugin": "^4.0.3",
    "postcss-loader": "^2.1.4",
    "sass-loader": "^5.0.1",
    "scss-loader": "0.0.1",
    "uglifyjs-webpack-plugin": "^1.3.0",
    "url-loader": "^0.6.2",
    "vue-loader": "^15.4.0",
    "vue-template-compiler": "^2.5.17",
    "webpack": "^4.16.5",
    "webpack-cli": "^3.1.0"
  },
  "scripts": {
    "build": "webpack --progress --hide-modules --color --mode production --config webpack.conf.js"
  },
  "files": [
    "dist",
    "lib",
    "packages",
    "package.json",
    "README.md"
  ]
}
`

// 生成.vue 以及 .md文件
const templateVue = `<template>

</template>

<script>
export default {
  name: '${packageName}',
  data(){
    return {
      
    }
  }
}
</script>
`
let demoPath = path.join(__dirname, '../demo/views')
let docPath = path.join(__dirname, '../doc/views/content')
fs.writeFileSync(`${demoPath}/${packageName}.vue`, templateVue)
fs.writeFileSync(`${docPath}/${packageName}.md`, '请在这里输入组件文档内容')

// 在package下添加新组件的文件
let src = path.join(__dirname, '../template/pack_template')
let dist = path.join(__dirname, `../packages/${packageName}`)
copy(src, dist).then(() => {
  // 修改components 下面的组件名
  let renamePath = path.join(__dirname, `../packages/${packageName}/src/components`)
  fs.renameSync(renamePath + '/HelloWorld.vue', renamePath + `/${packageName}.vue`)
  // 生成package.json文件
  fs.writeFile(process.cwd() + `/packages/${packageName}/package.json`, packageJson, 'utf8', function (err) {
    if(err){
      console.log(chalk.red('复制doc/router/index.js错误'))
      return
    }

    // 安装依赖包
    spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['install'], {
      cwd: `${currentPath}/${packageName}`,
      stdio: 'inherit'
    })
  })
})
