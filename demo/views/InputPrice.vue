<template>
  <div>
    <price-input @ok="comfirmPrice"
                 :fixed="4">
    </price-input>
  </div>
</template>

<script>
  import PriceInput from 'packages/InputPrice/src/index.js'
  export default {
    data(){
      return {}
    },
    methods: {
      comfirmPrice(value){
        console.log(value)
      }
    },
    components: {
      PriceInput
    }
  }
</script>
