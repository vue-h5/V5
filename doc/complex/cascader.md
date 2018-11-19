# Cascader 集联选择器
[toc]

## 代码示例

> 更多完整示例地址： example/src/views/complex/cascader/

HTML
```html
<v5-cascader :show.sync="show" :data="data" v-model="value" deep/>
```

JS
```js
data () {
    return {
        // 默认隐藏
        show: false,
        // 默认数据，可以为空
        value: ['jiangsu', 'nanjing', 'fuzimiao'],
        // 选择内容
        data: [
            {
                value: 'beijing',
                label: '北京',
                subTitle: '中国·首都',
                children: [
                    {
                        value: 'gugong',
                        label: '故宫',
                        disabled: true
                    },
                    {
                        value: 'tiantan',
                        label: '天坛'
                    },
                    {
                        value: 'wangfujing',
                        label: '王府井'
                    }
                ]
            }, 
        ],
    }
},
```

### filter 示例
filter可以让用户自己定义选择器确认工作。

假如，我们有以下数据：
```js
// return data
value: [],
data2: [
    {
        value: 1000,
        label: 1000,
        children: [
            {
                value: 1100,
                label: 1100
            },
            {
                value: 1200,
                label: 1200,
                children: [
                    {
                        value: 1210,
                        label: 1210
                    },
                    {
                        value: 1220,
                        label: 1220
                    }
                ]
            }
        ]
    },
    {
        value: 2000,
        label: 2000,
        children: [
            {
                value: 2100,
                label: 2100
            },
            {
                value: 2200,
                label: 2200
            }
        ]
    },
    {
        value: 3000,
        label: 3000,
        children: [
            {
                value: 3100,
                label: 3100
            },
            {
                value: 3100,
                label: 3100
            }
        ]
    }
]
```

我们想要只有值在大于 2000 时，用户才可以确认选择。
```html
<v5-cascader :show.sync="show3" :data="data2" v-model="value2" :filter="filter"/>
```

js中添加：
```js
methods: {
    filter (item, deep) {

        // 如果选择的项目 值大于2000的可以选择确认
        deep = item.value > 2000

        return deep
    }
}
```

## props 参数
| 参数 | 类型 | 说明 | 默认值 |
| --- | --- | --- | --- |
| value | `Array` | 当前选择内容 | [] |
| data | `Array` | 选择内容 | [] |
| show | `Boolean` | 控制弹层显示隐藏 | false |
| deep | `Boolean` | 控制选择器深度,默认每一级可以确认，true时只能到最后一级才能确认 | false |
| filter | `Function` | 用于让用户自己控制选择器何时可以确认，接受一个返回值 | - |
| async | `Boolean` | 异步标签，用于告诉组件，是异步操作，数据要加载后才能返回 |

## props - data 说明
| 参数 | 类型 | 说明 | 默认值 |
| --- | --- | --- | --- |
| value | `String` `Number` | 最终返回值 | - |
| label | `String` `Number` | 标题内容 | - |
| subTitle | `String` `Number` | 二级标题 | - |
| disabled | `Boolean` | 禁用 | false |
| children | `Array` | 子级，和data 相同 | - |

## 事件
| 方法 | 说明 | 默认值 |
| --- | --- | --- |
| input | 用于接受值的变化 | - |
| confirm | 确认按钮事件，返回值 |
| cancel | 取消按钮事件 |
| update | 选择发生变化，返回当前选择的内容 |