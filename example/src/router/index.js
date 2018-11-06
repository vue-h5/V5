import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home/index.vue'

Vue.use(Router)

const requireRouter = require.context(
    // 查询路由的目录
    '@/views',
    // 是否查询子目录
    true,
    // 路由匹配规则
    // 对于是以 index.vue 结尾的文件
    /(index\.vue$)|(route\.js$)/
)

// https://webpack.docschina.org/api/module-methods/#import-
const loadView = view => () => {
    console.log(view)
    return import(/* webpackChunkName: "[request]" */ `@/views/${view}/index.vue`)
}


let routes = {}
let helpObj = {}

requireRouter.keys().map(r => {
    registered(r)
})

function registered (r) {
    let path = r.slice(1, -10)

    if (r.endsWith('route.js')) {
        routes[path] = requireRouter(r).default
    } else {
        let pathArr = path.split('/')
        let arrLength = pathArr.length

        if (arrLength > 2) {
            // 处理父级内容
            let parent = `/${pathArr[arrLength -2]}`
            let parentPath = pathArr.slice(0, -1)
            parentPath = `.${parentPath.join('/')}/index.vue`

            // 2级路由内容
            let route = {
                path: pathArr[pathArr.length -1],
                component: loadView( r.slice(2, -10) )
            }

            // 判断辅助函数中有没有父级内容
            if (helpObj.hasOwnProperty(parentPath)) {
                let helpObjParent = helpObj[parentPath]
                // 父级是否有 children
                if (helpObjParent.children) {
                    helpObjParent.children.push(route)
                } else {
                    helpObjParent.children = [route] 
                }
            } 
            // 如果父级不存在
            else {
                // 注册父级
                registered(parentPath)
                // 更新路由
                routes[parent].children = [route]
            }

            // 增加到辅助函数中
            helpObj[r] = route
        } else {
            console.log(path)
            // 过滤已经存在的1级目录
            if (helpObj.hasOwnProperty(r)) return

            let data = {
                path,
                component: loadView( r.slice(2, -10) )
            }

            routes[path] = data
            // 增加到辅助函数中
            helpObj[r] = data
        }

    }
}

// 释放内存空间
helpObj = null

export default new Router({
    routes: Object.values(routes)
})