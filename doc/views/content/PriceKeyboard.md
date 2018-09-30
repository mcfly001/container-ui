# PriceKeyboard （数字弹出窗，用于输入价格）

## 安装

```JS
npm install @2dfire/PriceKeyboard --save-dev
```

## 引用

``` javascript
// 在全局引用
import Vue from 'vue'
import PriceKeyboard from '@2dfire/PriceKeyboard'
import '@2dfire/PriceKeyboard/dist/style.css'
Vue.component(PriceKeyboard.name, PriceKeyboard)
```

``` javascript
// 组件内引用
<script>
import PriceKeyboard from '@2dfire/PriceKeyboard'
import '@2dfire/PriceKeyboard/dist/style.css'
export default{
    data(){
        return {}
    },
    components: {
        PriceKeyboard
    }
}
</script>
```

### 注意事项
- v-model 传入的值可以是Number也可以是String，但是返回时候为String类型，因为要考虑小数点


### 配置项

|    name    |    Description   |   type   |default|
| -----------------  | ---------------- | :--------: | :----------: |
| show.sync     | 是否显示弹窗 | Boolean | false
| fixed        | 小数点位数 | [String, Number] | 2
| max        | 最大值 | [String, Number] | 100000
| min        | 最小值 |[String, Number] | 0
| has-point        | 是否要有小圆圈 | Boolean | true

### 事件

| name | Description   |
| :--------:   | -----  |
|   on-ok     |  点击确认触发的事件

### 使用

```html
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
```

```javascript
import PriceKeyboard from '@2dfire/PriceKeyboard'
export default{
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
```
