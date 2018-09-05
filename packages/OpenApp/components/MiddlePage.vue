<template>
  <div id="mask" v-show="showfloat">
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
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  $baseFontSize:37.5 !default;
  @function px2rem($px){
    @return $px / $baseFontSize * 1rem;
  }

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
    width: px2rem(75);
    height: px2rem(91.4);
    background-size: cover;
    margin-left: px2rem(-37.5);
    position: absolute;
    left: 50%;
    top: 1.5rem;
  }

  #mask .array {
    background: url("../images/guide-order.png") no-repeat;
    width: px2rem(58.6);
    height: px2rem(58.6);
    background-size: cover;
    position: absolute;
    right: 10%;
  }

  #mask p {
    text-align: center;
    font-size: px2rem(15.8);
    margin-top: px2rem(168);
  }
</style>
