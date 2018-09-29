<template>
  <input type="file"
         accept="image/*"
         @change="handleChange($event)" />
</template>

<script>
import request from '../api/index'
export default {
  name: 'FireUpload',
  props: {
    action: {
      type: String
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
    }
  },
  methods: {
    handleChange(event){
      let file = event.target.files[0]
      if(file){
        const checkSize = file.size > this.maxSize * 1024 * 1024
        const checkImgType = this.accept.indexOf(file.type.split("/")[1]) < 0
        if(checkSize){
          this.$emit('on-size-error')
          return
        }
        if(checkImgType){
          this.$emit('on-accept-error')
          return
        }
        this.submitFormData(file)
      }
    },
    submitFormData(file){
      let self = this
      let param = new FormData()
      let headers = { "Content-Type": "multipart/form-data;" }
      param.append('file', file)
      request(this.action, param, headers, function (e) {
          let progress = Math.round(e.loaded / e.total * 100)
          if(progress){
            self.$emit('on-progress', progress + '%')
          }
      }).then(data => {
        data.data && self.$emit('on-success', data.data)
      }).catch(e => {
        this.$emit('on-error', e)
      })
    }
  }
}
</script>
