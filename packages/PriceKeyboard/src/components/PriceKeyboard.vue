<template>
  <div class="wrapper">
    <div class="input-wrapper" @click.stop="inputFocus">
      <span class="input-value">{{ value }}</span>
      <span v-show="show" class="curson-animation"></span>
    </div>
    <div :class="['keyboard-wrapper', {active: show}]" @touchstart.stop>
      <ul class="value-list">
        <li v-for="value in numList"
            :key="value"
            @click.stop="changeValue(value)">
          <span v-if="value !== 'icon' && value !== '.' || (value === '.' && hasPoint)">{{ value }}</span>
          <div v-if="value === 'icon'" class="icon"></div>
        </li>
      </ul>
      <div class="operation-list">
        <div class="remove" @click.stop="removeOne">x</div>
        <div :class="['comfirm', {disabled: !comfimDisabled}]" @click.stop="comfirmPrice">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PriceKeyboard',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    value: {
      type: [ Number, String ],
      default: null
    },
    max: {
      type: [ Number, String ],
      default: 100000
    },
    min: {
      type: [ Number, String ],
      default: 0
    },
    fixed: {
      type: Number,
      default: 2
    },
    hasPoint: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    comfimDisabled(){
      return this.value
    }
  },
  data() {
    return {
      numList: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', 0, 'icon']
    }
  },
  mounted() {
    let self = this
    // 初始时候修正传入的值
    this.initValue(this.value)
    // 这段是为了兼容ios下伪元素:active 无效
    document.body.addEventListener('touchstart', function () {
      self.$emit('update:show', false)
    })
  },
  methods: {
    initValue(value){
      let adjustValue = value
      // 如果传入的字符串有非数字或者000.12这类的不规范
      adjustValue = parseFloat(this.value)
      // 如果传入的数字太小
      if(adjustValue < this.min){
        adjustValue = this.min
      }
      // 如果传入的数字太大
      if(adjustValue > this.max){
        adjustValue = this.max
      }
      // 如果传入的数字的小数位数太多
      if(String(adjustValue).split('.')[1] && (String(adjustValue).split('.')[1].length > this.fixed)){
        adjustValue = parseInt(adjustValue * Math.pow(10, this.fixed)) / Math.pow(10, this.fixed)
      }
      this.$emit('input', String(adjustValue))
    },
    inputFocus(){
      this.$emit('update:show', true)
    },
    changeValue(val){
      // 当点击icon就关闭弹窗
      if(val === 'icon'){
        this.$emit('update:show', false)
      }
      else{
        // 转换为字符串
        let value = Object.prototype.toString.call(this.value) === '[object String]' ? this.value : String(this.value)
        if(val === '.'){
          let conditionA = this.value < this.max
          let conditionB = String(value).indexOf('.') < 0
          conditionA && conditionB && this.$emit('input', value + val)
        }
        else{
          let newval = (value === '0') ? val : value + val
          let float = (newval && newval.split('.')[1]) || ''
          let conditionA = newval <= this.max
          // 判断小数点位数
          let conditionB = !float || (float.length <= this.fixed)
          conditionA && conditionB && this.$emit('input', newval)
        }
      }
    },
    removeOne(){
      // 转换为字符串
      let value = Object.prototype.toString.call(this.value) === '[object String]' ? this.value : String(this.value)
      let newvalue = value.substring(0, value.length - 1)
      let conditionA = newvalue >= this.min
      conditionA && this.$emit('input', newvalue)
    },
    comfirmPrice(){
      this.$emit('update:show', false)
      this.$emit('on-ok')
    }
  }
}
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
  .input-wrapper{
    width: 100px;
    height: 20px;
    border: 1px solid #ccc;
    padding: 2px 4px;
    text-align: left;
    line-height: 20px;
    letter-spacing: 0;
    font-size: 0;

    .input-value{
      display: inline-block;
      font-size: 14px;
      vertical-align: 2px;
      margin-right: 2px;
    }

    .curson-animation{
      display: inline-block;

      &::after {
        content:'';
        display: inline-block;
        width:1px;
        height:14px;
        margin-top: 3px;
        animation: blink 1s infinite steps(1, start)
      }
    }

    @keyframes blink {
      0% {
        background-color: white;
      }
      50% {
        background-color: black;
      }
      100% {
        background-color: white;
      }
    }
  }

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
        border-left: 1px solid #cdcdcf;
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
        border-left: 1px solid #cdcdcf;

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
          color: rgba(255, 255, 255, 0.4);
          pointer-events: none;
        }
      }
    }
  }
</style>
