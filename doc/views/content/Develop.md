#### 开发指南

##### 步骤一
``` html
// 组件名推荐使用-连接， 比如cell-swipe, 执行以下命令后只需关注组件本身开发
// 如 npm run add cell-swipe douchi
npm run add <组件名> <花名拼音>
```

##### 步骤二
- 在packages/<组件名>/src 下完成组件开发

##### 步骤三
- 在demo/views/<组件名>.vue 中编写组件demo

##### 步骤四
- 在doc/views/content/<组件名>.md 中编写组件文档

##### 执行打包
``` javascript
npm run build_package <组件名>
```

##### 执行发布（将组件通过lerna发布至私库，并且将文档发布到服务器）
``` javascript
npm run publish
```

#### 命令行解析
``` javascript
// 添加新组件
npm run add <component-nam> <花名拼音>

// 删除要开发的组件
npm run remove <component-name>

// 热加载文档页面
npm run doc_dev

// 热加载案例页面
npm run demo_dev

// 热加载doc和demo页面
npm run dev

// 打包文档
npm run doc_build <组件名>

// 打包案例
npm run demo_build

// 文档和案例打包
npm run build

// 组件开发完成上传至git以及公司私库（事先需要全局安装lerna）
npm run publish
```
