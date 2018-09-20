<template>
  <div>
    <price-input :show.sync="show"
                 :value="value"
                 @on-focus="focusEvent">
    </price-input>
    <price-popup :show="show"
                 :comfim-disabled="comfimDisabled"
                 @on-close="close"
                 @on-input="changeValue"
                 @on-reduce="reduceValue">
    </price-popup>
  </div>
</template>

<script>
import PriceInput from 'packages/PriceInput/src/index.js'
import PricePopup from 'packages/PricePopup/src/index.js'
export default {
  data(){
    return {
      show: false,
      value: "2",
      comfimDisabled: false
    }
  },
  methods: {
    focusEvent(){
      this.show = true
    },
    close(){
      this.show = false
    },
    changeValue(value){
      this.value = this.value + value
    },
    reduceValue(){
      if((!isNaN(parseFloat(this.value) || this.value === '.') && this.value !== null && this.value !== undefined)){
        let num = this.value.slice(0, this.value.length - 1)
        this.value = num
      }
    }
  },
  components: {
    PricePopup,
    PriceInput
  }
}
</script>
