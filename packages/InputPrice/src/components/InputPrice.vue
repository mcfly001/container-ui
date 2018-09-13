<template>
  <div class="price-input-wrapper">
    <!--模拟input-->
    <div class="input" @click="showKeyboard = true">
      <span class="input-value">{{ price }}</span>
      <span v-show="showKeyboard" class="curson-animation"></span>
    </div>

    <div :class="['keyboard-wrapper', {active: showKeyboard}]">
      <ul class="value-list">
        <li v-for="value in values"
            :key="value"
            :class="{icon: value === 'icon'}"
            @click="changeValue(value)">
          <span v-if="value !== 'icon'">{{ value }}</span>
          <div v-if="value === 'icon'" class="icon" />
        </li>
      </ul>
      <div class="operation-list">
        <div class="remove" @click="removeOne">x</div>
        <div :class="['comfirm', {disabled: !price}]"  @click="comfirmPrice">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PriceInput',
    props: {
      max: {
        type: Number,
        default: 100000
      },
      min: {
        type: Number,
        default: 0
      },
      fixed: {
        type: Number,
        default: 2
      }
    },
    data() {
      return {
        price: '',
        showKeyboard: false,
        values: [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, 'icon']
      }
    },
    created(){
      // 这段是为了兼容ios下伪元素:active 无效
      document.body.addEventListener('touchstart', function () {})
      this.price = ((this.min === 0 ? this.min : String(this.min)) || '')
    },
    methods: {
      showPriceKeyboard(){
        this.showKeyboard = true
      },
      changeValue(value){
        let hasPoint = this.price.indexOf('.') >= 0
        if(value === 'icon'){
          this.showKeyboard = false
          this.$emit('ok', parseFloat(this.price))
        }
        else if(value === '.'){
          if(!hasPoint){
            this.price = this.price + String(value)
          }
        }
        // 数字0 - 9
        else{
          // 加上数字后的值
          let num = this.price + String(value)
          let conditionA = num <= this.max
          // 如果有小圆点
          if(hasPoint){
            let totalLength = num.length
            let pointindex = this.price.indexOf('.')
            // 小数点后的位数符合条件
            let conditionB = totalLength - (pointindex + 1) <= this.fixed
            conditionA && conditionB && (this.price = num)
          }
          else{
            conditionA && (this.price = num)
          }
        }
      },
      removeOne(){
        if(this.price && this.price.length){
          let num = this.price.slice(0, this.price.length - 1);
          if(num >= this.min){
            this.price = num
          }
        }
      },
      comfirmPrice(){
        this.showKeyboard = false
        this.$emit('ok', parseFloat(this.price))
      }
    }
  }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>

  .input{
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
        border-right: 1px solid #cdcdcf;
        border-top: 1px solid #cdcdcf;
        line-height: 50px;
        font-weight: bold;

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
