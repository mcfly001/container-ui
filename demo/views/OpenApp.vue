<template>
  <div>
    <open-app :options="openAppOptions">
      立即开通
    </open-app>
  </div>
</template>

<script>
import OpenApp from 'packages/OpenApp/src/index.js'
export default {
  data(){
    return {
      openAppOptions: {
        schemaurl: 'weixin://dl/add',
        iosdlurl:  'https://itunes.apple.com/cn/app/%E4%BA%8C%E7%BB%B4%E7%81%AB%E6%8E%8C%E6%9F%9C/id900873713?mt=8',
        androiddlurl: '',
       // maskbgurl: 'http://pic.58pic.com/58pic/13/30/88/29I58PICpKz_1024.jpg',
//        getLatestAndroidUrl(callback){
////          XX.get(url).then((data) => {
////            let {url} = data // 安装最新下载地址
////            callback && callback(url)
////          })
//        }
      }
    }
  },
  components: {
    OpenApp
  }
}
</script>
