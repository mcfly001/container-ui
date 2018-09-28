# open-app

## 安装

```JS
npm install @2dfire/OpenApp --save-dev
```

## 引用

``` javascript
// 在全局引用
import Vue from 'vue'
import OpenApp from '@2dfire/OpenApp'
import '@2dfire/OpenApp/dist/style.css'
Vue.component(OpenApp.name, OpenApp)
```

``` javascript
// 组件内引用
<script>
import OpenApp from '@2dfire/OpenApp'
export default{
    data(){
        return {}
    },
    components: {
        OpenApp
    }
}
</script>
```

### 配置项

|    name    |    Description   |   type   |default|
| -----------------  | ---------------- | :--------: | :----------: |
| schemaurl     | 跳转到app的URL地址(必选) |String|
| iosdlurl        | itunes下载地址(必选) |String |
| androiddlurl        | 安卓下载地址（和getAndroidurl2选1 ） |String |
| maskbgurl        | 跳转页小动物的背景（非必选） |String | 灰太狼


### 事件

| name | Description   |
| :--------:   | -----  |
|   getLatestAndroidUrl     |  获取最新的androidurl包

### 使用

```html
<template>
    <div>
        <open-app :options="openAppOptions">
             立即开通
        </open-app>
    <div>
</template>
```

```javascript
export default{
    data() {
          return {
            openAppOptions: {
              schemaurl: 'weixin://dl/add',
              iosdlurl:  'https://itunes.apple.com/cn/app/%E4%BA%8C%E7%BB%B4%E7%81%AB%E6%8E%8C%E6%9F%9C/id900873713?mt=8',
              androiddlurl: '',
              maskbgurl: 'http://pic.58pic.com/58pic/13/30/88/29I58PICpKz_1024.jpg',
              getLatestAndroidUrl(callback){
                XX.get(url).then((data) => {
                    let {url} = data // 安装最新下载地址
                    callback && callback(url)
                })
              }
            }
          }
        }
    }
```
