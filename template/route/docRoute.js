// 拼接doc/router下面的index.js文件
const fs = require('fs')
const chalk = require('chalk')

let defaultImportTep = `import Introduce from '../views/Introduce.vue'
import Develop from '../views/Develop.vue'
`

let defaultRoute = `
export const routes = [
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

module.exports = docRoute = function (files) {
  files.forEach((item, $index) => {
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

  let str = defaultImportTep  + defaultRoute

  fs.writeFile(process.cwd() + '/doc/router/index.js', str, 'utf8', function (err) {

    if(err){
      console.log(chalk.red('复制doc/router/index.js错误'))
      return
    }
    console.log(chalk.green('复制doc/router/index.js成功'))
  })
}
