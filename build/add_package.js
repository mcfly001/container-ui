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
  fs.readFile(process.cwd() + '/template/pack_template/package.json', function (err, data) {
    if(err){
      console.log(err)
      return
    }
    let json = JSON.parse(data)
    let keys = Object.keys(json)
    let obj = {}
    for(let i=0; i<keys.length; i++){
      if(keys[i] === 'name'){
        obj[keys[i]] = `@2dfire/${packageName}`
      }
      else{
        obj[keys[i]] = json[keys[i]]
      }
    }
    fs.writeFile(process.cwd() + `/packages/${packageName}/package.json`, JSON.stringify(obj, null, '\t'), 'utf8', function (err) {
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
})
