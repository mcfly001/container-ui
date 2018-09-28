<template>
  <price-keyboard v-model="inputValue"
                  :show.sync="show"
                  :fixed="3"
                  :max="10000000"
                  :min="0"
                  :has-point="true"
                  @on-ok="ok">
  </price-keyboard>
</template>

<script>
import PriceKeyboard from 'packages/PriceKeyboard/src/index.js'
export default {
  data(){
    return {
      inputValue: "00000.12",
      show: false
    }
  },
  methods: {
    ok(){
      console.log(this.inputValue)
    }
  },
  components: {
    PriceKeyboard
  }
}
</script>
