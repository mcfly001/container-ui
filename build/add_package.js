#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const demoRoute = require('../template/route/demoRoute')
const docRoute = require('../template/route/docRoute')
const packagesPath = path.join(__dirname, '../packages')
const packageName = process.argv.splice(2)[0]

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
