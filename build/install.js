#!/usr/bin/env node
const fs = require('fs')
const chalk = require('chalk')
const { spawn } = require('child_process')
const packageName = process.argv.splice(2)[0]
const currentPath = process.cwd() + '/packages'

fs.readdir(currentPath, function (err, files) {
  if(err) throw err
  if(files.indexOf(packageName) >= 0 ){
    spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['install'], {
      cwd: `${currentPath}/${packageName}`,
      stdio: 'inherit'
    })
  }
  else{
    console.log(chalk.red('package下没有找到该名称'))
  }
})



