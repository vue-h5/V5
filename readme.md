# V5

📲 移动端轻量组件库。

[toc]

# 安装
```bash
yarn add @ektx/v5
# or
npm i @ektx/v5 -S
```

# 引入

## 完整引用
main.js修改如下：

```js
import Vue from 'vue'
import App from './App.vue'
// 引入 v5 组件
import v5 from '@ektx/v5'
// 引入 v5 样式
import '@ektx/v5/dist/v5.css'

Vue.use(v5)

new Vue({
  render: h => h(App)
}).$mount('#app')
```

## 按需引用
按需引用和你引用 `src/components` 方式相同

```js
import v5Button from '@ektx/v5/lib/components/button'

export default {
    // ...其它代码
    components: {
        v5Button
    }
}

```
