#!/usr/bin/env node
const { spawn } = require('child_process')
const fs = require('fs')
const chalk = require('chalk')
const packageName = process.argv.splice(2)[0]

fs.readdir(process.cwd() + '/packages', function (err, files) {
  if(err) throw err
  if(!packageName){
    console.log(chalk.red('请输入需要打包的组件的名字'))
    return
  }
  if(files.indexOf(packageName) >= 0 ){
    spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['run', 'build'], {
      cwd: process.cwd() + `/packages/${packageName}`,
      stdio: 'inherit'
    })
  }
  else{
    console.log(chalk.red('package下没有找到该名称请检查'))
  }
})
