#### xaxis-scroll 横轴滚动
##### 引入依赖
``` javascript
// 在main.js里面引入
import { XaxisScroll } from '@2dfire/container-ui'
import '@2dfire/container-ui/lib/index.css'

Vue.component(XaxisScroll.name, XaxisScroll)
```

##### 基础用法
``` html
<xaxis-scroll class="xaxis-wrapper m-b-large"
              :scroll-data="items"
              @change-item="changeItem">
</xaxis-scroll>
```
``` javascript
export default{
  data(){
    return {
        items: [
          {
            "id": 1,
            "name": "营销价值"
          },
          {
            "id": 2,
            "name": "产品优势"
          },
          {
            "id": 3,
            "name": "会员搭建"
          },
          {
            "id": 4,
            "name": "营销工具"
          },
          {
            "id": 5,
            "name": "营销渠道"
          },
          {
            "id": 6,
            "name": "会员痛点"
          },
          {
            "id": 7,
            "name": "活动营销"
          }
      ]
    }
  },
  methods: {
    changeItem(item){
        console.log(item)
    }
  }
}
```

##### API
 参数 | 类型 | 说明 | 默认值
---|---|---|---
scroll-data | Array | 横向滚动的数组 | null

##### 方法
 参数 | 说明
---|---
change-item | 改变选中项，返回的参数包含选中项的信息
