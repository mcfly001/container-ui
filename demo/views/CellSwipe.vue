<template>
  <div>
    <cell-swipe v-for="(item, $index) in items"
                class="cell-list"
                :index="$index"
                :key="$index"
                @delete-item="deleteItem">
      {{item}}
    </cell-swipe>
  </div>
</template>

<script>
import CellSwipe from '../../package/cellswipe/src/components/CellSwipe.vue'
export default {
  name: '',
  data() {
    return {
      items: ['侧滑删除1', '侧滑删除2', '侧滑删除3']
    }
  },
  methods: {
    deleteItem($index){
      alert($index)
    }
  },
  components: {
    CellSwipe
  }
}
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
.cell-list{
  height: 40px;
  line-height: 40px;
}
</style>

