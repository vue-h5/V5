# Form 表单

[toc]

## 代码示例

> 更多完整示例地址： example/src/views/form/form/

main.js
```js
import veeValidate, { Validator } from 'vee-validate'
// 引入中文
import zh_CN from 'vee-validate/dist/locale/zh_CN'

Vue.use(veeValidate)

Validator.localize('zh', zh_CN)
```

HTML
```html
<v5-form :data="format" :value="params" @submit="submit"/>
```

Js
```js
let format = [{
    label: '姓名',
    type: 'text',
    placeholder: '你叫啥？',
    value: 'name',
    name: 'name',
    required: true,
    validate: 'min:1|max:5'
}, {
    label: '证件类型',
    type: 'select',
    placeholder: '请出示证件',
    value: 'card',
    name: 'card',
    required: true,
    options: [{
        label: '身份证',
        value: 'IDCard'
    }, {
        label: '公司牌🐶',
        value: 'dogCard'
    }]
}]

let params = {
    name: '二狗',
    card: '',
}

// result 验证结果，true或false
submit (result) {
    if (result) {
        alert('OK')
    } else {
        alert('Error')
    }
}
```

## props 参数
| 参数 | 类型 | 说明 | 默认值 |
|:---:| --- | --- |:---:|
| data | `Array` | 表单的样式 | - |
| params | `Object` | 值 | - |

### data
| 参数 | 类型 | 说明 | 默认值 |
|:---:| --- | --- |:---:|
| labek | `String` | 标题 | - |
| type | `String`或`separator` | 输入区的样式 | - |
| placeholder | `String` | 占位符 | - |
| value | `String` | 内容字段，对应在params中的内容 | - |
| name | `String` | 输入区的name,没有时为 value | - |
| required | `Boolean` | 是否必填 | false |
| readonly | `Boolean` | 只读 | false |
| disabled | `Boolean` | 禁用 | false |
| options | `Array` | 下拉选择参数 | - |
| event | `Function` | 事件 | - |
| slot | `String` | 插槽名称 | - |

### options 
| 参数 | 类型 | 说明 | 默认值 |
|:---:| --- | --- |:---:|
| label | `String` | 标签 | - |
| value | `String` | 值 | - |

## 事件
| 参数 | 类型 | 说明 | 默认值 |
|:---:| --- | --- |:---:|
| submit | `Function` | 提交验证，返回成功失败状态 | - |