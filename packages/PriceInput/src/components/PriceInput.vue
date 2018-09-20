<template>
  <div class="input" @click.stop="changeState">
    <span class="input-value">{{ value }}</span>
    <span v-show="show" class="curson-animation"></span>
  </div>
</template>

<script>
export default {
  name: 'PriceInput',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: null
    }
  },
  mounted(){
    let self = this
    document.addEventListener('click', function(){
      self.$emit('update:show', false)
    })
  },
  methods: {
    changeState(){
      this.$emit('on-focus')
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
</style>
