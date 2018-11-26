# Icon 图标

#图标添加步骤
1.在iconfont中注册一个账号,联系管理员将自己拉入相关项目的组,iconfont地址如下:(http://iconfont.cn/manage/index?manage_type=myprojects&projectId=886927)
2.第一步:选择'我的图标';第二步:点击'上传Icon',将svg上传至里面,并修改名称;
3.将项目中需要使用的图标先'添加入库',点击右上角购物车图标,将其图标选择'添加至项目';
4.选择'我的项目','查看在线链接',将下方代码复制粘贴至相对应的.scss文件中,如果有更新相对应的图标库,要将其代码更新,否则会出现图标无法正常显示的问题;在此项目中,'查看在线链接'生成的代码放至V5\src\styles\components\icon.scss;
5.项目中需要的图标,在iconfont中'我的项目',鼠标移入相对应的图标,选择'复制代码',首先将其名称与代码添加至icon.scss文件中$icons中,然后在V5\example\src\views\base\icon\index.vue中相对应的位置中添加使用.
