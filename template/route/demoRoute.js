// 拼接demo/router下面的index.js文件
const fs = require('fs')
const chalk = require('chalk')
const { tranformStr } = require('../utils.js')

let defaultImportTep = `import Vue from 'vue'
import Router from 'vue-router'
import Introduce from '../views/Introduce.vue'
import Develop from '../views/Develop.vue'
`

let defaultRoute = `
let routes = [
  {
    path: '/',
    redirect: '/Introduce'
  },
  {
    path: '/Introduce',
    name: 'Introduce',
    component: Introduce
  },
  {
    path: '/Develop',
    name: 'Develop',
    component: Develop
  },`

let exportStr = `
export default new Router({
  routes
})
`

let useStr = `
Vue.use(Router)
`

module.exports = function (files) {
  files.forEach((item, $index) => {
    if(item.indexOf('.') >= 0) return
    defaultImportTep += `import ${tranformStr(item)} from '../views/${tranformStr(item)}.vue'` + '\n'
    if($index === files.length - 1){
      defaultRoute += `
  {
    path: '/${tranformStr(item)}',
    name: '${tranformStr(item)}',
    component: ${tranformStr(item)}
  }`
    }
    else{
      defaultRoute += `
  {
    path: '/${tranformStr(item)}',
    name: '${tranformStr(item)}',
    component: ${tranformStr(item)}
  },`
    }
  })

  defaultRoute = defaultRoute + '\n' + ']'

  let str = defaultImportTep + useStr + defaultRoute + '\n' + exportStr

  fs.writeFile(process.cwd() + '/demo/router/index.js', str, 'utf8', function (err) {

    if(err){
      console.log(chalk.red('重新生成demo/router/index.js错误'))
      return
    }
    console.log(chalk.green('重新生成demo/router/index.js成功'))
  })
}
