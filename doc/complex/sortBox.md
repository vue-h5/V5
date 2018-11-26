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
    }
},
```  
主要是传入sort中的数据  

## props 参数  
| 参数 | 类型 | 说明 | 默认值 |  
| --- | --- | --- | --- |  
| label | `String` | 头部显示标题 | - |    
| sort | `Boolean``Function` | `false``true`'自定义排序' 值为false时排序是没有作用的 | - |      
| classes | `up``down` | 默认降序排列，注意多个排序时，只使用最后一个 |  |    
