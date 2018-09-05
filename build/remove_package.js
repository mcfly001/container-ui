#!/usr/bin/env node
require('shelljs/global')

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const demoRoute = require('../template/route/demoRoute')
const docRoute = require('../template/route/docRoute')
const packagesPath = path.join(__dirname, '../packages')
const demopath = path.join(__dirname, '../demo')
const docpath = path.join(__dirname, '../doc')
const packageName = process.argv.splice(2)[0]

fs.readdir(packagesPath, function (err, files) {
  if(err){
    console.log(chalk.red('err', err))
  }
  if(files.includes(packageName)){
    rm('-rf', `${packagesPath}/${packageName}`)
    rm('-rf', `${demopath}/views/${packageName}.vue`)
    rm('-rf', `${docpath}/views/content/${packageName}.md`)
    let index = files.indexOf(packageName)
    files.splice(index, 1)
    demoRoute(files)
    docRoute(files)
  }
  else{
    console.log(chalk.red('找不到要删除的组件，请检查组件名'))
  }
})
