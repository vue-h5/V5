# 开发计划
[toc]

## 基础组件

### Icon 图标
[图标库 - iconfont](http://iconfont.cn/manage/index?manage_type=myprojects&projectId=886927)  
[使用文档](./base/icon.md)  

**todo**  
- [x] 完善示例中的内容 - `ymy` 2018-11-26  
- [x] 添加使用文档 - `ymy` 2018-11-26  
- [ ] 优化字体的引用方式，改成包内自带
- [ ] 添加搜索的功能，方便查看图标
- [ ] 添加步骤条组件- `exy` [开发中] 


### Button 按钮
[文档 base/button](./base/button.md)


### Cell 单元格
[使用文档](./base/cell.md)

**todo**
- [ ] 添加对 router-link 支持
- [x] 添加标题前图标功能
- [ ] inner接收[String, Number]两种类型
- [ ] 添加插槽

### Layer 弹层  
[使用文档](./base/layer.md)   
**todo**
- [x] 添加使用文档- `ymy` 2018-11-26  


### LoadingBar
[使用文档 base/loadingBar](./base/loadingBar.md)

### Marquee
[使用文档 base/marquee](./base/marquee.md)

**todo**
- [ ] 添加上下滚动效果
- [ ] 添加左右滚动效果
- [ ] 添加鼠标悬停功能


### timer 计时器/定时器
**todo**
- [ ] 开始事件，开始时返回事件
- [ ] 结束事件，结束时返回事件
- [ ] 更新事件，每次时间变化返回事件
- [ ] 启动事件，用于接受手动开始事件
- [ ] 暂停事件，用于接受手动暂停事件
- [ ] 重置事件，用于接受手重置事件


## 复合组件
### Cascader 集联选择器
[使用文档](./complex/cascader.md)

### Cell-group 单元格组
用于优化显示单元格集合的效果。

> 只能用于包含 cell

**todo*
- [ ] 支持接受一个数组，在有数组时，自动组装cell


### Collapse 折叠面板
- 支持展开收缩功能
- 支持自定义展开还是收缩

**todo**

- [x] 优化箭头指示功能，在有to或href属性时，默认**右箭头图标**，用户可以定自己的图标 - `zwl` 2018-11-15
- [x] 扩展open属性功能，对面板可以规定可以多个展开还是只能单个 - `zwl` 2018-11-15
- [ ] 扩展支持唯一展开功能，点击收缩的时，自动展开，已经展开的如果是自己收缩，不是自己的展开收缩，反之自然
- [ ] 添加内容动态扩展  


### SortBox 排序盒子
[使用文档](./complex/sortBox.md)   

**todo**
- [x] 添加使用文档 - `ymy` 2018-11-26 


## 表单

### Form 表单