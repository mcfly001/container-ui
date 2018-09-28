<template>
  <div id="mask" v-show="showfloat" @click="closeMask">
    <div class="hello" :style="bgimg"></div>
    <div class="array"></div>
    <p>点击这里的“在浏览器中打开”</p>
  </div>
</template>
<script>
import {isIos} from '../lib/client'

export default {
  name: "MiddlePage",
  props: {
    showfloat: {
      type: Boolean,
      required: true,
      default: false
    },
    maskbgurl: {
      type: String
    }
  },
  data(){
    return {
      bgimg: {
        backgroundImage: "url(" + this.maskbgurl + "),url(" + require("../images/hello.png") + ")"
      }
    }
  },
  methods: {
    closeMask(){
      this.$emit('close-mask')
    }
  }
}
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>

  #mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    z-index: 3;
  }

  #mask .hello {
    background-repeat: no-repeat;
    width: 75px;
    height: 91.4px;
    background-size: cover;
    margin-left: -37.5px;
    position: absolute;
    left: 50%;
    top: 80px;
  }

  #mask .array {
    background: url("../images/guide-order.png") no-repeat;
    width: 58.6px;
    height: 58.6px;
    background-size: cover;
    position: absolute;
    right: 10%;
  }

  #mask p {
    text-align: center;
    font-size: 15.8px;
    margin-top: 190px;
  }
</style>
