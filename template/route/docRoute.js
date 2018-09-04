// 拼接doc/router下面的index.js文件
const fs = require('fs')
const chalk = require('chalk')
const { tranformStr } = require('../utils.js')

let defaultImportTep = `import Introduce from '../views/content/Introduce.md'
import Develop from '../views/content/Develop.md'
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
    if(item.indexOf('.') >= 0) return
    defaultImportTep += `import ${tranformStr(item)} from '../views/content/${tranformStr(item)}.md'` + '\n'
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

  let str = defaultImportTep  + defaultRoute

  fs.writeFile(process.cwd() + '/doc/router/index.js', str, 'utf8', function (err) {

    if(err){
      console.log(chalk.red('重新生成doc/router/index.js错误'))
      return
    }
    console.log(chalk.green('重新生成doc/router/index.js成功'))
  })
}
