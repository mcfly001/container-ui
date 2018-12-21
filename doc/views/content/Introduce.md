#### 工具内容
- 本工具主要是为了方便使用者快速将开发的组件打包上传至公司私库并将通过markdown编写的文档快速发布至服务器

#### 打包流程
- 详情请看开发指南

#### 文档服务器地址（push到gitlab,会通过webHook快速部署到服务器）
- http://wuliaoyuan.top:6767/container-ui/doc/index.html#/introduce

#### 外部的工具
- webpack4（打包）
- lerna （组件发布管理）
- webHook (文档发布)
  
#### 特殊说明
- 本组件库打包的结果都是按照设计稿375作为基准，打包的结果为px，如果要转换成rem或者vw需要在具体工程中的webpack配置的less或者sass中不要忽略node_module

fasdfas