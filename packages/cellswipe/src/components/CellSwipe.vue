<template>
  <div class="cell-swipe border-b">
    <div :style="`transform: translate3d(${distance}, 0, 0)`"
         :class="['cell-swipe-wrapper', {moving: !ismove}]">
      <div ref="content" @touchstart="start">
        <slot></slot>
      </div>
      <p class="btn_delete" ref="delete" @click.stop="comfirm">删除</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CellSwipe',
  props: {
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      distance: 0,
      isOpen: false, // 判断是否已经展开
      ismove: false, // 是否正在移动
      startX: 0,
      startY: 0,
      moveX: 0,
      moveY: 0
    }
  },
  methods: {
    start(event){
      let dom = this.$refs.content
      this.startX = event.changedTouches[0].pageX
      this.startY = event.changedTouches[0].pageY
      this.ismove = false
      this.distance = 0
      if(!this.isOpen){
        dom.addEventListener('touchmove', this.move, false)
      }
      else{
        this.isOpen = false
      }
    },
    move(event){
      let filterA = Math.abs(this.moveX - this.startX) - Math.abs(this.moveY - this.startY) > 0
      let filterB = this.startX - this.moveX > 10
      let maxLeft = this.$refs.delete.clientWidth
      let dom = this.$refs.content
      this.moveX = event.changedTouches[0].pageX
      this.moveY = event.changedTouches[0].pageY
      this.ismove = true
      if(filterA && filterB){
        event.stopPropagation()
        event.preventDefault()
        if(this.startX - this.moveX < maxLeft){
          this.distance = - this.startX + this.moveX + 'px'
        }
        else{
          this.distance = - maxLeft + 'px'
        }
        dom.addEventListener('touchend', this.end, false)
      }
    },
    end(){
      let dom = this.$refs.content
      let maxLeft = this.$refs.delete.clientWidth
      dom.removeEventListener('touchmove', this.move, false)
      dom.removeEventListener('touchend', this.end, false)
      this.ismove = false
      this.distance = - maxLeft + 'px'
      this.isOpen = true
    },
    comfirm(){
      this.$emit('delete-item', this.index)
    }
  }
}
</script>

<style type="text/scss" lang="scss">
  $var: fire;
  .cell-swipe{
    overflow: hidden;

    .cell-swipe-wrapper{
      position: relative;
      background: white;
      font-size: 14px;

      &.moving{
        transition: 0.6s cubic-bezier(0.18, 0.89, 0.32, 1);
      }

      p.btn_delete{
        position: absolute;
        top: 0;
        width: 65px;
        height: 100%;
        right: -1px;
        padding: 0;
        margin: 0;
        transform: translateX(100%);
        background-color: #f44;
        color: white;
        text-align: center;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
      }
    }
  }
</style>
