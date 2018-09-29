# FireUpload

## 安装

```JS
npm install @2dfire/FireUpload --save-dev
```

## 引用

``` javascript
// 在全局引用
import Vue from 'vue'
import FireUpload from '@2dfire/FireUpload'
Vue.component(FireUpload.name, FireUpload)
```

``` javascript
// 组件内引用
<script>
import FireUpload from '@2dfire/FireUpload'
export default{
    data(){
        return {}
    },
    components: {
        FireUpload
    }
}
</script>
```

### 配置项

|    name    |    Description   |   type   |default|
| -----------------  | ---------------- | :--------: | :----------: |
| action     | 上传图片的地址 | String | null
| accept        | 图片类型 | Array | ['jpeg', 'png', 'gif', 'jpg']
| max-szie      | 图片最大值（单位为M） | Number | 10
### 事件

| name | Description   |
| :--------:   | -----  |
|   on-size-error     |  图片大小不合规的回调
|   on-accept-error     |  上传的类型不合法
|   on-progress     |  上传图片的进度（返回一个参数为进度百分比）
|   on-error     |  上传图片的错误（返回一个参数为错误的内容）
|   on-success     |   图片上传成功的回调（返回一个参数即后端返回的data）

### 使用

```html
<template>
 <FireUpload :action="action"
             :accept="accept"
             :max-size="maxSize"
             @on-size-error="sizeError"
             @on-accept-error="acceptError"
             @on-progress="uploading"
             @on-success="uploadSuccess"
             @on-error="uploadError">
 </FireUpload>
</template>
```

```javascript
import FireUpload from '@2dfire/FireUpload'
export default{
     data(){
       return {
          action: 'http://gateway.2dfire-daily.com/?app_key=200017&method=com.dfire.soa.boss.centerpc.file.service.IUploadFileService.upload&projectName=zmfile&path=99225967/menu&s_os=Mac%20OS&s_osv=10.13.6&s_ep=Chrome&s_epv=68.0.3440.106&s_sc=1440*743&timestamp=1537322001647&s_web=1&v=1.0&format=json&env=333&lang=zh_CN',
          maxSize: 10,
          accept: ['jpeg', 'png', 'gif', 'jpg']
       }
     },
     methods: {
       sizeError(){
         console.log('图片不能超过10m')
       },
       acceptError(){
         console.log('类型错误')
       },
       uploading(progress){
         console.log(progress)
       },
       uploadSuccess(data){
         console.log(data.code)
       },
       uploadError(e){
         console.log(e)
       }
     },
     components: {
       FireUpload
     }
  }
```
