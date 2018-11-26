import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 路由集合
let routes = {}
// 辅助函数集合
let helpObj = {}
// 懒加载路由集合
let requireRouter = {}

/**
 * 自动注册功能
 * @param {function} data webpack require.context
 */
function auto (data) {
    // 保存懒加载
    requireRouter = data
    
    data.keys().map(r => {
        registered(r)
    })
}

// 数组转驼峰写法
// ['','abc','edF'] => AbcDef
function arr2camel (arr) {
    let result = ''

    arr.forEach(val => {
        // val 不能是空内容
        if (val) {
            if (result) {
                result += val.slice(0,1).toUpperCase() + val.slice(1).toLocaleLowerCase()
            } else {
                result = val
            }
        }
    })

    return result
}

/**
 * 路由懒加载
 * @param {string} view 页面地址
 * 
 * 参考： https://webpack.docschina.org/api/module-methods/#import-
 */
const loadView = view => import(/* webpackChunkName: "[request]" */ `@/views/${view}/index.vue`)


/**
 * 自动注册功能
 * @param {string} r 文件地址
 */
async function registered (r) {
    let path = r.slice(1, -10)

    if (r.endsWith('route.js')) {
        let userRoute = await requireRouter(r)
        // 动态添加路由
        myRouter.addRoutes([userRoute.default])
    } else {
        let pathArr = path.split('/')
        let arrLength = pathArr.length

        if (arrLength > 2) {
            // 处理父级内容
            let parent = pathArr[arrLength -2]
            let parentPath = pathArr.slice(0, -1)
            parentPath = `.${parentPath.join('/')}/index.vue`

            // 路由内容
            let route = {
                name: arr2camel(pathArr),
                path: pathArr[arrLength -1],
                component: () => requireRouter(r)
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
                routes[`/${parent}`].children = [route]
            }

            // 增加到辅助函数中
            helpObj[r] = route
        } else {
            // 过滤已经存在的1级目录
            if (helpObj.hasOwnProperty(r)) return
            // 处理 / 目录，此项目将 project 为根目录
            let name = path.slice(1)
            path = path === '/home' ? '/' : path
            
            let data = {
                name,
                path,
                component: () => requireRouter(r)
            }

            routes[path] = data
            // 增加到辅助函数中
            helpObj[r] = data
        }

    }
}

// 自动处理懒加载
auto(require.context(
    // 查询路由的目录
    '@/views',
    // 是否查询子目录
    true,
    // 路由匹配规则
    // 对于是以 index.vue 结尾的文件
    /(index\.vue$)|(route\.js$)/,
    // 启动懒加载
    'lazy'
))

// 注册路由
const myRouter = new Router({
    routes: Object.values(routes)
})

// 释放内存空间
helpObj = null

export {
    loadView,
    myRouter
}

export default myRouter