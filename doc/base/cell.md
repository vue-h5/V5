# Cell 单元格

## 代码示例

```html
<v5-cell-group>
    <v5-cell title="标题"/>
    <v5-cell logo="ios-cog" title="通用" icon="right"/>
    <v5-cell title="标题" sub-title="二级标题"/>
    <v5-cell title="标题" sub-title="二级标题" inner="apple"/>
    <v5-cell title="标题" sub-title="二级标题" icon="apple"/>
</v5-cell-group>
```

**跳转**
```html
<v5-cell-group>
    <v5-cell title="返回主页" sub-title="/" to="/"/>
    <v5-cell title="跳转百度" sub-title="http://baidu.com" href="http://baidu.com"/>
</v5-cell-group>
```

## props 参数
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| logo | 主图标 | `String` | - |s
| title | 标题 | `String` | - |
| subTitle | 副标题 | `String` | - |
| inner | 内容 | `String` | - |
| icon | 图标,图标在 to 与 href 存在时为右箭头 | `String` | - |
| to | 路由跳转对象，同 vue-router 的 to | `String` | - |
| href | 跳转地址 | `String` | - |
