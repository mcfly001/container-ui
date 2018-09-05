#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const generate_demoRoute = require('../template/route/demoRoute')
const generate_docRoute = require('../template/route/docRoute')
const generate_index = require('../template/common/index_js')
const generate_vue = require('../template/common/tep_vue')
const packagesPath = path.join(__dirname, '../packages')
const argv = process.argv.splice(2)
const { copy } = require('fs-extra')
const { spawn } = require('child_process')
const { tranformStr } = require('../template/utils.js')
const currentPath = process.cwd() + '/packages'
const packageName = argv[0]
const author = argv[1]

if(!author){
  console.log(chalk.red('请输入作者花名'))
  return
}

// 重新生成路由
fs.readdir(packagesPath, function (err, files) {
  if(err){
    console.log(chalk.red('err', err))
  }
  if(!files.includes(packageName)){
    generate_demoRoute(files.concat(packageName))
    generate_docRoute(files.concat(packageName))
  }
  else{
    console.log(chalk.red('已存在同名包，请修改包名称'))
    return
  }
})

// 生成.vue 以及 .md文件
const templateVue = `<template>

</template>

<script>
export default {
  name: '${tranformStr(packageName)}',
  data(){
    return {
      
    }
  }
}
</script>
`
let demoPath = path.join(__dirname, '../demo/views')
let docPath = path.join(__dirname, '../doc/views/content')
fs.writeFileSync(`${demoPath}/${tranformStr(packageName)}.vue`, templateVue)
fs.writeFileSync(`${docPath}/${tranformStr(packageName)}.md`, '请在这里输入组件文档内容')

// 在package下添加新组件的文件
let src = path.join(__dirname, '../template/copy')
let dist = path.join(__dirname, `../packages/${tranformStr(packageName)}`)

copy(src, dist).then(() => {
  // 新增components 下面的组件名
  let rvuePath = path.join(__dirname, `../packages/${tranformStr(packageName)}/src/components`)
  fs.writeFile(rvuePath + `/${tranformStr(packageName)}.vue`, generate_vue(tranformStr(packageName)))
  // 新增index.js 文件
  fs.writeFile(dist + '/src/index.js', generate_index(tranformStr(packageName)))
  // 生成package.json文件
  fs.readFile(process.cwd() + '/template/copy/package.json', function (err, data) {

    if(err){
      console.log(err)
      return
    }
    let json = JSON.parse(data)
    let keys = Object.keys(json)
    let obj = {}
    for(let i=0; i<keys.length; i++){
      if(keys[i] === 'name'){
        obj['name'] = `@2dfire/${tranformStr(packageName)}`
      }
      else if(keys[i] === 'author'){
        obj[keys[i]] = {
          "name": author,
          "email": author + '@2dfire.com'
        }
      }
      else{
        obj[keys[i]] = json[keys[i]]
      }
    }
    fs.writeFile(process.cwd() + `/packages/${tranformStr(packageName)}/package.json`, JSON.stringify(obj, null, '\t'), 'utf8', function (err) {
      if(err){
        console.log(chalk.red('复制错误'))
        return
      }

      // 安装依赖包
      // spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['install'], {
      //   cwd: `${currentPath}/${tranformStr(packageName)}`,
      //   stdio: 'inherit'
      // })
    })
  })
})
