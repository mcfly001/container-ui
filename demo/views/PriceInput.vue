<template>
  <price-input :show.sync="show"
               :value="value"
               @on-focus="focusEvent">
  </price-input>
</template>

<script>
import PriceInput from 'packages/PriceInput/src/index.js'
export default {
  data(){
    return {
      show: false,
      value: "2"
    }
  },
  methods: {
    // 在这里处理input focus 的事件
    focusEvent(){
      this.show = true
    }
  },
  components: {
    PriceInput
  }
}
</script>
