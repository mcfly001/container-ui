<template>
  <div class="header-wrapper">
    <div class="header_logo"></div>
    <span>业务组件库</span>
    <!-- <a href="javascript:void(0)" @click="jumpToBase" class="tobase">基础组件库</a> -->
  </div>
</template>

<script>
  import urlConfig from 'urlConfig'
  export default{
    methods: {
      jumpToBase(){
        window.location.href = urlConfig.JUMP_URL
      }
    }
  }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>

  .header-wrapper{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #eaeefb;
    text-align: left;
    padding-left: 60px;
    color: #333;
    font-size: 20px;
    font-weight: 500;
    box-sizing: border-box;

    .header_logo{
      background-size: cover;
    }

    .tobase{
      float: right;
      margin-right: 50px;
      font-size: 20px;
    }
  }
</style>

