# vue-ui
基于vue的一个ui组件库

#### 开发指南

##### 步骤
- 在package目录下面新增你要开发的组件，例如cell-swipe
- 在src/index.js中引入组件、注册并且导出
``` javascript
import CellSwipe from '../packages/cell-swipe'

const install = function(Vue, options = {}){
  Vue.component(CellSwipe.name, CellSwipe)
}

// 自动安装
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

module.exports = {
  install,
  CellSwipe
}
```
- 执行打包
``` javascript
// 第一种方式，将组件打入dist/index.js中，将packages中的cell-swipe打包，并在lib下面生成对应的js和css文件
npm run sigle cell-swipe

//第二种方式，将组件打入dist/index.js中，将packages中的所有组件都打包，并在lib下面生成对应的js和css文件
npm run build
```
- 编写example，在examples/router中添加路由，在examples/views新建cell-swipe.vue文件，在common/nav.js中添加路由
``` javascript
// 在example/router 中添加路由
import CellSwipe from '../views/cell-swipe.vue'
const routesArr = [
  CellSwipe
]

//在common/nav.js中的paths对象中添加路由
let paths = [
  {
    name: 'cell-swipe',
    path: '/cell-swipe'
  }
]
```

- 编写文档，在doc/views/content 中新增cell-swipe.md文件，并且在doc/router中引入组件
``` javascript
import CellSwipe from '../views/content/cellSwipe.md'
const routesArr = [
  CellSwipe
]
```

#### 命令行解析
``` javascript
// 执行单元测试,打开test/unit/coverage/Icov-report/index.html，会看到测试结果
npm run test

// example, 会在浏览器中热加载组件
npm run dev

// 文档dev, 在浏览器中生成文档的热加载内容，文档右侧的example需要先执行npm run doc
npm run docdev

// 打包文档
npm run docbuild

// 单个组件打包，将所有组件打包到dist/index.js和dist/index.css中， 并且将该组件单独打包到lib下
npm run sigle <component-name>

// 所有组件打包, 将所有组件打包到dist/index.js和dist/index.css中， 并且将所有组件都单独打包，并在lib下生成对应的文件
npm run build

// 将组件上传到私库,上传的文件在package.json中定义，目前上传的文件为dist lib packages package.json README.md
npm run prepublishOnly
```
