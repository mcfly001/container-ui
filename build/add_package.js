#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const demoRoute = require('../template/route/demoRoute')
const docRoute = require('../template/route/docRoute')
const packagesPath = path.join(__dirname, '../packages')
const packageName = process.argv.splice(2)[0]
const { copy } = require('./copy')

// 重新生成路由
fs.readdir(packagesPath, function (err, files) {
  if(err){
    console.log(chalk.red('err', err))
  }
  if(!files.includes(packageName)){
    demoRoute(files)
    docRoute(files)
  }
  else{
    console.log(chalk.red('已存在同名包，请修改包名称'))
  }
})

// 生成.vue 以及 .md文件
const templateVue = `
<template>

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
copy(src, dist)
