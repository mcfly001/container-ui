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

<script>
import FireUpload from 'packages/FireUpload/dist/index.js'
export default {
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
</script>
