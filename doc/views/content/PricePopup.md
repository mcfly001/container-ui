# PricePopup (配合PriceInput使用)

## 安装

```JS
npm install @2dfire/PricePopup --save-dev
```

## 引用

``` javascript
// 在全局引用
import Vue from 'vue'
import PricePopup from '@2dfire/PricePopup'
Vue.component(PricePopup.name, PricePopup)
```

``` javascript
// 组件内引用
<script>
import PricePopup from '@2dfire/PricePopup'
export default{
    components: {
        PricePopup
    }
}
</script>
```

### 配置项

|    name    |    Description   |   type   |default|
| -----------------  | ---------------- | :--------: | :----------: |
| show     | 是否显示光标 | Boolean | false
| comfim-disabled        | 确定按钮是否disabled | Boolean | false


### Events

| name | Description   |
| :--------:   | -----  |
|   on-close    |  关闭弹出框
|   on-input    |  输入内容
|   on-reduce    |  点击x

### 使用

```html
<template>
 <div>
    <price-input :show.sync="show"
                 :value="value"
                 @input-focus="focusEvent">
    </price-input>
    <price-popup :show="show"
                 :comfim-disabled="comfimDisabled"
                 @on-close="close"
                 @on-input="changeValue"
                 @on-reduce="reduceValue">
    </price-popup>
  </div>
</template>
```

```javascript
<script>
  import PriceInput from '@2dfire/PriceInput'
  import PricePopup from '@2dfire/PricePopup'
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
```
