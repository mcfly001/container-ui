#!/usr/bin/env node
const { spawn } = require('child_process')
const fs = require('fs')
const chalk = require('chalk')
const packageName = process.argv.splice(2)[0]

fs.readdir(process.cwd() + '/package', function (err, files) {
  if(err) throw err
  if(files.indexOf(packageName) >= 0 ){
    spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['run', 'build'], {
      cwd: process.cwd() + `/package/${packageName}`,
      stdio: 'inherit'
    })
  }
  else{
    console.log(chalk.red('package下没有找到该名称请检查'))
  }
})
