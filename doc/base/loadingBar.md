# LoadingBar 加载进度条

[toc]

## 代码示例

> 更多完整示例地址： example/src/views/base/loadingBar/

JS
```js
// 开启自动加载
this.$v5LoadingBar.start()
// 启动可控加载,预定1%
this.$v5LoadingBar.start(1)
// 更新进度，完成50%
this.$v5LoadingBar.progress(50)

// 完成加载
this.$v5LoadingBar.finish()

// 加载错误
this.$v5LoadingBar.error()
```
