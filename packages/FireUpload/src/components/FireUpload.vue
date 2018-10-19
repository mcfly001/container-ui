<template>
  <div class="upload-input-wrapper">
    <slot></slot>
    <input type="file"
           ref="uploadInput"
           accept="image/*"
           @change="handleChange($event)"/>
  </div>
</template>

<script>
import request from '../api'
export default {
  name: 'FireUpload',
  props: {
    action: {
      type: String,
      default: ''
    },
    maxSize: {
      type: Number,
      default: 10
    },
    accept: {
      type: Array,
      default(){
        return []
      }
    },
    onBeforeUpload: {
      type: Function
    },
    onSizeError: {
      type: Function
    },
    onAcceptError: {
      type: Function
    },
    onProgress: {
      type: Function
    },
    onSuccess: {
      type: Function
    },
    onUploadError: {
      type: Function
    }
  },
  methods: {
    handleChange(event){
      let file = event.target.files[0]
      if (file) {
        const checkSize = file.size > this.maxSize * 1024 * 1024
        const checkImgType = this.accept.indexOf(file.type.split("/")[1]) < 0
        if (checkSize) {
          this.onSizeError()
          return
        }
        if (checkImgType) {
          this.onAcceptError()
          return
        }
        this.submitFormData(file)
        // 上传后清空input里面的value
        event.target.value = ''
      }
    },
    submitFormData(file){
      let self = this
      let param = new FormData()
      let headers = {"Content-Type": "multipart/form-data;"}
      param.append('file', file)
      let spec = this.onBeforeUpload()
      if (spec) {
        request(this.action, param, headers, function (e) {
          let progress = Math.round(e.loaded / e.total * 100)
          if (progress) {
            self.onProgress(progress)
          }
        }).then(data => {
          data.data && self.onSuccess(data.data)
        }).catch(e => {
          self.onUploadError(e)
        })
      }
    }
  }
}
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>

  .upload-input-wrapper {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 60px;
    line-height: 60px;
    border: 1PX dashed #2d8cf0;
    font-size: 0;

    input {
      position: absolute;
      font-size: 14px;
      right: 0;
      top: 0;
      width: 100%;
      bottom: 0;
      opacity: 0;
      overflow: hidden;
      color: transparent;
    }

    .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      font-size: 20px;
    }
  }
</style>
