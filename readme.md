# V5
[toc]

## 运行
```bash
git clone git@gitlab.hztianque.com/cell/V5.git

# 安装依赖
yarn
```

## 打包
```bash
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
```

## 项目使用
```bash
# 添加到项目 使用dev分支
yarn add git+ssh://git@gitlab.hztianque.com/cell/V5.git#dev
```

## 资源
[图标库](http://iconfont.cn/manage/index?manage_type=myprojects&projectId=886927)