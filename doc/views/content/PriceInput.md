# price-input

## 安装

```JS
npm install @2dfire/PriceInput --save-dev
```

## 引用

``` javascript
// 在全局引用
import Vue from 'vue'
import OpenApp from '@2dfire/PriceInput'
Vue.component(PriceInput.name, PriceInput)
```

``` javascript
// 组件内引用
<script>
import PriceInput from '@2dfire/PriceInput'
export default{
    data(){
        return {}
    },
    components: {
        PriceInput
    }
}
</script>
```

### 配置项

|    name    |    Description   |   type   |default|
| -----------------  | ---------------- | :--------: | :----------: |
| max     | 输入的最大值 |Number| 100000
| min        | 输入的最小值 |Number | 0
| fixed        | 小数点位数 |Number | 2


### Events

| name | Description   |
| :--------:   | -----  |
|   ok     |  当点击确定或者键盘向下的按钮时候触发，返回一个value就是当前输入框的值

### 使用

```html
<template>
    <div>
        <price-input @ok="comfirmPrice"
                     :fixed="4">
        </price-input>
    <div>
</template>
```

```javascript
  export default {
    methods: {
      comfirmPrice(value){
        console.log(value)
      }
    }
  }
```
