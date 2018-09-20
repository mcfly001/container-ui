<template>
  <div :class="['keyboard-wrapper', {active: show}]">
    <ul class="value-list">
      <li v-for="value in values"
          :key="value"
          @click.stop="changeValue(value)">
        <span v-if="value !== 'icon'">{{ value }}</span>
        <div v-if="value === 'icon'" class="icon"></div>
      </li>
    </ul>
    <div class="operation-list">
      <div class="remove" @click.stop="removeOne">x</div>
      <div :class="['comfirm', {disabled: !comfimDisabled}]"  @click.stop="comfirmPrice">确定</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PricePopup',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    comfimDisabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, 'icon']
    }
  },
  created(){
    // 这段是为了兼容ios下伪元素:active 无效
    document.body.addEventListener('touchstart', function () {})
  },
  methods: {
    changeValue(value){
      if(value === 'icon'){
        this.$emit('on-close')
      }
      else{
        this.$emit('on-input', value)
      }
    },
    removeOne(){
      this.$emit('on-reduce')
    },
    comfirmPrice(){
      this.$emit('on-close')
    }
  }
}
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
  .keyboard-wrapper {
    position: fixed;
    left: 0;
    bottom: -200px;
    z-index: 1000;
    width: 100%;
    height: 200px;
    overflow: hidden;
    background-color: #f6f6f8;
    transition: transform .4s ease;

    &.active{
      transform: translate3d(0, -200px, 0);
    }

    .value-list{
      width: 75%;
      overflow-y: hidden;
      display: inline-block;
      font-size: 18px;

      li{
        float: left;
        width: 1 / 3 * 100%;
        height: 1 / 4 * 100%;
        box-sizing: border-box;
        border-right: 1px solid #cdcdcf;
        border-top: 1px solid #cdcdcf;
        line-height: 50px;
        font-weight: bold;
        list-style-type: none;

        .icon{
          width: 32px;
          height: 32px;
          margin: auto;
          background-size: contain;
          background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAZlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwbJTWAAAAIXRSTlMAwIBA8wMUCVhXD+/YIYyGLAaSkX9sDt21X0fSZagXzj/c39OvAAAA1klEQVRIx+2Ry04DQQwE2554BvaR7ASWJU/o//9JtJIF2lOMEqEIpU516DpYxoO7IWmQwYPpICG6yYPVM0I8ra4IGpEdRhEUkeMstc5yFCkmMmIn0iyCTL5iS1pDbrAmSyHX2JBvRr5Ayfzr4Lobako9+pRgLvYtcKl/fENR/cReFVU1zWKmukdSrXApN3vcgsjjFkSOXnCjx7WaQmjrwZZBTvivjOcfL2q4RJmmDKdK2+Mi567zor63AwJkL8z3keKQ43svGt+Hi4+T78OF7+PFgAf3zBePLyDpzyoFEAAAAABJRU5ErkJggg==);
          margin-top: 9px;
        }
        &:nth-child(3n + 1){
          border-left: 0;
        }

        &:active{
          background-color: #e5e5e5 !important;
        }
      }
    }

    .operation-list{
      border-top: 1px solid #cdcdcf;
      float: right;
      width: 25%;
      height: 100%;

      .remove, .comfirm{
        height: 100px;
        line-height: 100px;
        font-size: 25px;

        &:active{
          background-color: #e5e5e5 !important;
        }
      }

      .comfirm{
        background: #0091dc;
        color: white;
        font-size: 16px;
        font-weight: bold;

        &.disabled{
          color: rgba(255, 255, 255, 0.6);
          pointer-events: none;
        }
      }
    }
  }
</style>
