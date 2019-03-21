# Datepiccker 时间选择器

[toc]

## 代码示例

> 更多完整示例地址： example/src/views/form/datepicker/

HTML
```html
<v5-datepicker v-model="currentDate" :format="format"/>

<v5-datepicker v-model="currentTime" type="time"/>
```

Js
```js
date () {
    return {
        currentDate: new Date,
        currentTime: '12:00'
    }
}
```

## props 参数
| 参数 | 类型 | 说明 | 默认值 |
|:---:| --- | --- |:---:|
| `value` | `Date\String` | 时间 | 当前时间 |
| `type` | `datetime\date\time` | 显示效果，支持自定义，以 `/` 分隔，<br/>Y(年)/M(月)/D(日)/HH(时)/MM(分)/SS(秒) | `datetime` |
| `startDate` | `Date` | 开始日期 | 当前时间前10年 |
| `endDate` | `Date` | 结束日期 | 当前时间后10年 |
| `startTime` | `String` | 开始时间 | - |
| `endTime` | `String` | 结束时间 | - |
| `format` | `Object` | 时间格式 | - |

### format
| 参数 | 类型 | 说明 | 默认值 |
|:---:| --- | --- |:---:|
| `year` | `String` | 年 | - |
| `momth` | `String` | 月 | - |
| `date` | `String` | 日 | - |
| `hour` | `String` | 时 | - |
| `minutes` | `String` | 分 | - |
| `seconds` | `String` | 秒 | - |
