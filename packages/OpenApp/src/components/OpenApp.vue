<template>
  <div>
    <a href="javascript:void(0)" @click="openApp">
      <slot></slot>
    </a>
    <middle-page :showfloat="showfloat"
                 :maskbgurl="options.maskbgurl"
                 @close-mask="closeMask">
    </middle-page>
  </div>
</template>

<script>
  import openApp from '../../lib/openApp'
  import MiddlePage from '../../components/MiddlePage.vue'
  import {isInWeiXin, isQQ, isDingDing} from '../../lib/client'
  export default {
    name: 'OpenApp',
    data(){
      return {
        showfloat: false
      }
    },
    props: {
      options: {
        type: Object,
        required: true,
        default: {
          schemaurl: '',
          iosdlurl:  '',
          androiddlurl: '',
          maskbgurl: '',
          getLatestAndroidUrl: (callback) => {
            callback && callback()
          }
        }
      }
    },
    methods: {
      openApp(){
        let {schemaurl, iosdlurl, androiddlurl, getLatestAndroidUrl} = this.options
        if(isInWeiXin || isQQ || isDingDing){
          this.showfloat = true
          return
        }
        openApp(schemaurl, iosdlurl, androiddlurl, getLatestAndroidUrl)
      },
      closeMask(){
        this.showfloat = false
      }
    },
    components: {
      MiddlePage
    }
  }
</script>

