module.exports = function (name) {
  return `<template>
  <div>

  </div>
</template>

<script>
export default {
  name: '${name}',
  data() {
    return {}
  },
  created(){

  },
  mounted() {

  },
  methods: {},
  components: {}
}
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>

</style>
`
}