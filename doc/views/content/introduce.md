#### 使用指南

##### 安装
``` javascript
npm install @2dfire/mobile-ui --save-dev
```

##### 引入组件
- 方式一(推荐)： 使用  [babel-plugin-component](https://www.npmjs.com/package/babel-plugin-component)
``` javascript
// 安装babel-plugin-component
npm install babel-plugin-component --save-dev
```
``` javascript
// 在.babelrc 下面添加插件配置
{
    plugin: [
        xxx,
        [
            "component", {
                "libraryName": "@2dfire/container-ui",
                "style": true,
            },
            "@2dfire/mobile-ui"
        ]
    ]
}
```

接下来你可以在代码中引入组件了， 插件会实现按需加载了
``` javascript
import { CellSwipe } from '@2dfire/mobile-ui'
import '@2dfire/mobile-ui/lib/index.css'
```

- 方式二： 导入所有组件(该方式不允许使用babel-plugin-component)
``` javascript
// 在main.js中引入插件
import Vue from 'vue'
import * as mobileUi from '@2dire/mobile-ui'
import '@2dfire/mobile-ui/dist/index.css'

Vue.use(mobileUi)
```

