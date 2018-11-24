# V5
[toc]

## 项目使用
```bash
# 在项目中使用开发版本
yarn add git+ssh://git@gitlab.hztianque.com/cell/V5.git#dev

# 使用发布版本
yarn add @ektx/v5
```

## 打包
```bash
# 打包 js css
yarn run build

# 打包 js
yarn run es6

# 打包 style
yarn run style
```

> 打包后的文件在 **./dist** 目录

## 运行 Demo
```bash
cd example

# 安装依赖，如果已经安装请忽略
yarn

# 运行 Demo
yarn run serve
```
## 目录说明
```bash
V5
|---- build 打包命令
|---- dist 打包后文件
|---- example 示例
|---- src 组件开发目录
  |---- components 组件库
  |---- styles 组件的样式库
  |---- index.js 组件引用
```

## 项目贡献

### 添加组件

#### 创建文件
先从dev分支上创建一个自己的分支内容，然后在src目录中添加组件。

我们以开发一个 hello 组件为例。

首先在 src/components 目录中添加一个 hello 文件夹(文件夹以驼峰命名)。

然后，我们创建 hello.vue 和 index.js 文件。

hello.vue 文件内容：
```html
<template>
    <h1>{{mes}}</h1>
</template>

<script>
export default {
    name: 'v5-hello',
    data () {
        return {
            mes: 'Hello V5'
        }
    }
}
</script>
```
在 vue 文件中，我们要注意的有：
- 不要添加样式表或样式模块。
- js 中的 name 格式是 `v5-文件名` 如果你的文件夹名是 helloWorld,名称应该是：`v5-hello-world`。

index.js 内容：
```js
export { default } from './hello.vue'
```

#### 添加引用
我们创建好了组件后，需要添加到 index.js 中才可以使用。

打开 src/index.js 文件，我们要修改如下内容：
```diff
// 其它已经引入组件内容
+ import v5Hello from './components/hello/index.js'

 const version = '0.0.1'
 const components = [
     // 其它引入组件内容
+    v5Hello,
 ]

...

 export {
    // 其它内容
+    v5Hello
 }
```

添加完成后，我们就可以在 example 中写 demo 了，组件已经可以在它那使用了。

> 这里要注意的是引入你的组件时，你写的位置要与你的文件夹排序一致，注意查看已经的引入与文件夹的位置关系。

#### 添加样式
有了组件，没有样式的话，还不是一个完整的组件。现在，我们 src/styles 目录中添加一个样式。

在 **src/styles/components** 添加 *hello.scss*，然后打开同目录中的**index.scss**，添加你的组件引用。

src/styles/components/index.scss:
```diff
  // 其它的组件样式
+ @import 'hello.scss';
```

现在，v5有了一个名为 `<v5-hello></v5-hello>` 的组件了。

## 资源
[图标库](http://iconfont.cn/manage/index?manage_type=myprojects&projectId=886927)