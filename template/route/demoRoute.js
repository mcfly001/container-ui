// 拼接demo/router下面的index.js文件
const fs = require('fs')
const chalk = require('chalk')

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

module.exports = demoRoute = function (files) {
  files.forEach((item, $index) => {
    if(item.indexOf('.') >= 0) return
    defaultImportTep += `import ${item} from '../views/${item}.vue'` + '\n'
    if($index === files.length - 1){
      defaultRoute += `
  {
    path: '/${item}',
    name: '${item}',
    component: ${item}
  }`
    }
    else{
      defaultRoute += `
  {
    path: '/${item}',
    name: '${item}',
    component: ${item}
  },`
    }
  })

  defaultRoute = defaultRoute + '\n' + ']'

  let str = defaultImportTep + useStr + defaultRoute + '\n' + exportStr

  fs.writeFile(process.cwd() + '/demo/router/index.js', str, 'utf8', function (err) {

    if(err){
      console.log(chalk.red('复制demo/router/index.js错误'))
      return
    }
    console.log(chalk.green('复制demo/router/index.js成功'))
  })
}
