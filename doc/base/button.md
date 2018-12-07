# Button 按钮

[toc]

## 代码示例

> 更多完整示例地址： example/src/views/base/button/

HTML
```html
<h3>基础</h3>
<v5-button>基础</v5-button>
<v5-button type="primary">primary</v5-button>
<v5-button type="danger">danger</v5-button>
<v5-button type="warn">primary</v5-button>

<h3>简约</h3>
<v5-button plain>基础</v5-button>

<h3>禁用</h3>
<v5-button disabled>基础</v5-button>

<h3>大小</h3>
<v5-button size="hug">hug</v5-button>

<h3>加载中</h3>
<v5-button loading="true">基础</v5-button>

<h3>圆角</h3>
<v5-button type="primary" radius="0">圆角-0</v5-button>
<v5-button type="primary" radius="round">圆角-round</v5-button>

<h3>图标</h3>
<v5-button icon="youtube"></v5-button>
<v5-button icon="zap">闪电</v5-button>
<v5-button>
    <v5-icon class="android"/>
    android
</v5-button>
```

## props 参数
| 参数 | 类型 | 说明 | 默认值 |
|:---:| --- | --- |:---:|
| type | `primary danger warn`或空 | 按钮样式 | 空 |
| plain | `Boolean` | 让按钮以透明简约形式展示 | - |
| disabled | `Boolean` | 控制按钮是否可以控制 | `false` |
| size | `bug big small min`或空 | 控制按钮大小，你也可以通过样式自己调整 | 空 |
| loading | `Boolean` | 控制按钮是否显示加载中 | `false` |
| radius | `Number`或`round`(圆角) | 控制按钮的圆角效果 | `3px` |
| icon | `String` | 图标效果 | - |


## 事件
支持正常的vue事件。