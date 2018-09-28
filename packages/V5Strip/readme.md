# V5Strip

用于展示多个数据之前的百分比。

## Demo


## 使用方法
HTML
```html
<V5Strip :data="data1"></V5Strip>
```

JS
```javascript
{
    data1: {
        title: {
            label: '标题',
            value: 11000
        },
        subTitle: {
            label: '副标题',
            value: 1000
        },
        list: [
            {
                label: 'iPhone',
                value: 7000
            }, 
            {
                label: 'iPad',
                value: 1000
            },
            {
                label: 'iMac',
                value: 1000
            },
            {
                label: 'iMac Pro',
                value: 1000
            },
            {
                label: 'MacBook',
                value: 1000
            }
        ]
    },
    colors: ['#f90', '#09f', 'yellowgreen', 'red', 'yellow']
}
```

## Props
| 属性 | 类型 | 说明 | 默认值 |
| --- | --- | --- | --- |
| data | Object | 传入的数据 | - |
| colors | Array | 颜色数组 | 有 |
| hideMarker | boolean | 是否隐藏标签内容 | false |
| evt | function | 自定义功能 | - |

