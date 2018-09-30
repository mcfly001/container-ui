<template>
  <div>
    <div style="margin-top: 40px;">案例二</div>
    <div class="upload">
      <ul>
        <li v-for="(item, $index) in uploadList" :key="$index">
          <img :src="item.url"/>
        </li>
        <li  v-show="isUploading">
          <div class="loading">{{ progress }}</div>
        </li>
      </ul>
      <FireUpload ref="upload"
                  :action="action"
                  :accept="accept"
                  :max-size="maxSize"
                  @on-size-error="sizeError"
                  @on-accept-error="acceptError"
                  @on-progress="uploadProgress"
                  @on-success="uploadSuccess"
                  @on-error="uploadError">
        <span class="icon"> + </span>
      </FireUpload>
    </div>
  </div>
</template>

<script>
  import FireUpload from 'packages/FireUpload/src/index.js'
  export default {
    data(){
      return {
        action: 'http://gateway.2dfire-daily.com/?app_key=200017&method=com.dfire.soa.boss.centerpc.file.service.IUploadFileService.upload&projectName=zmfile&path=99225967/menu&s_os=Mac%20OS&s_osv=10.13.6&s_ep=Chrome&s_epv=68.0.3440.106&s_sc=1440*743&timestamp=1537322001647&s_web=1&v=1.0&format=json&env=333&lang=zh_CN',
        maxSize: 10,
        accept: ['jpeg', 'png', 'gif', 'jpg'],
        uploadList: [
          {
            name: '1.jpg',
            url: 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
          },
          {
            name: '3.jpg',
            url: 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
          }
        ],
        progress: '',
        isUploading: false
      }
    },
    methods: {
      sizeError(){
        console.log('图片不能超过10m')
      },
      acceptError(){
        console.log('类型错误')
      },
      uploadProgress(value){
        if(value < 99){
          this.progress = value + '%'
        }
        else{
          this.progress = '99%'
        }
        this.isUploading = true
      },
      uploadSuccess(data){
        // 图片预加载
        let img = new Image()
        img.src = 'https://ifiletest.2dfire.com/' + data.data.data
        // 如果图片已经加载了
        if(img.complete){
          this.isUploading = false
          this.progress = '100%'
          this.uploadList.push({url: 'https://ifiletest.2dfire.com/' + data.data.data})
        }
        else{
          img.onload = () => {
            this.isUploading = false
            this.progress = '100%'
            this.uploadList.push({url: 'https://ifiletest.2dfire.com/' + data.data.data})
          }
        }
        this.progress = ''
      },
      uploadError(e){
        this.isUploading = false
        this.progress = ''
      }
    },
    components: {
      FireUpload
    }
  }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
  ul{
    list-style-type: none;
    display: inline-block;
    font-size: 0;

    li {
      width: 60px;
      height: 60px;
      display: inline-block;
      margin-right: 5px;
      box-shadow: 0 1px 1px rgba(0, 0, 0,.2);

      img {
        width: 100%;
        height: 100%;
      }

      .loading {
        width: 60px;
        height: 60px;
        background: white;
        float: left;
        font-size: 14px;
        color: black;
        text-align: center;
        line-height: 60px;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
      }
    }
  }
</style>
