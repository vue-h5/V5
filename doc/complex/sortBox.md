# sortBox 排序盒子  
## 代码示例  

> 更多完整示例地址： example/src/views/complex/sortBox/    
HTML    
```html    
<v5-sort-box class="sort-box" :sort="sort" v-model="data"></v5-sort-box>
```   
JS     
```js   
data () {
    return {
        sort: [
            {
                label: '姓名',
                sort: false,
                classes: 'up'
            },
            {
                label: '年龄',
                key: 'age',
                classes: 'up',
                sort: this.sortList
            },
            {
                label: '成绩',
                key: 'grade',
                sort: true
            }
        ],
        data: [
            {
                name: 'tom',
                age: 20,
                grade: 80
            },
            {
                name: 'bob',
                age: 22,
                grade: 82
            },
            {
                name: 'alis',
                age: 21,
                grade: 30
            },
            {
                name: 'oppo',
                age: 20,
                grade: 100
            },
            {
                name: 'limi',
                age: 23,
                grade: 90
            },
            {
                name: 'jeri',
                age: 19,
                grade: 60
            },
        ]
    }
},  
```  
```js     
methods: {
        /**
         * 自定义排序方法
         * @param {Object} item 当前点击的对象
        */
        sortList (item) {
            this.data.sort((a, b) => {
                let result = 0
                let key = item.key
                if (item.classes === 'up') {
                    result = a[key] - b[key]
                } else if (item.classes === 'down') {
                    result = b[key] - a[key]
                }
                return result
            })
        }
    }
```    
主要是传入sort中的数据  

## props 参数  
| 参数 | 类型 | 说明 | 默认值 |  
| --- | --- | --- | --- |  
| label | `String` | 头部显示标题 | - |    
| sort | `Boolean` `Function` | `false` `true`'自定义排序' 值为false时classes的排序是没有作用的 | - |      
| classes | `up` `down` | 默认降序排列，注意多个排序时，只使用最后一个 | `down` |    
