# Layer 弹层
[toc]

## 代码示例

> 更多完整示例地址： example/src/views/complex/layer/

HTML
```html
<v5-layer class="demo-1" :show="show">
    <h1>Hello World</h1>
    <button @click="show = !show">close</button>
</v5-layer>

<v5-layer class="demo-1" :show="show" :position="top">
    <h1>Hello World</h1>
    <button @click="show = !show">close</button>
</v5-layer>
```

JS
```js
data () {
    return {
        // 默认隐藏
        show: false
    }
},
```

## props 参数
| 参数 | 类型 | 说明 | 默认值 |
| --- | --- | --- | --- |
| show | `Boolean` | 控制显示或隐藏弹层 | `false` |
| position | `top left right bottom`或空 | 控制弹层的显示方向 | 空 |
| animate | `String` | 定义你要的动画效果 | `fade` |


## 事件
| 方法 | 说明 | 默认值 |
| --- | --- | --- |
| click | 返回弹层点击事件 | - |