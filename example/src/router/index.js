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
 * @param {function} ctx webpackAsyncContext
 */
function auto(ctx) {
    // 保存懒加载
    requireRouter = ctx
    ctx.keys().forEach(filePath => {
        registered(filePath)
    })
}

/**
 * 路由懒加载
 * @param {string} view 页面地址
 * 
 * 参考： https://webpack.docschina.org/api/module-methods/#import-
 */
const loadView = view => () => import(/* webpackChunkName: "[request]" */ `@/views/${view}/index.vue`)


/**
 * 自动注册功能
 * @param {string} r 文件地址
 */
async function registered(r) {
    // 过滤已经存在的1级目录
    if (helpObj.hasOwnProperty(r)) return

    let path = r.slice(1, -10)

    if (r.endsWith('route.js')) {
        let { default: main } = await requireRouter(r)
        // 动态添加路由
        myRouter.addRoutes([main])
    } else {
        let pathArr = path.split('/')
        let arrLength = pathArr.length

        if (arrLength > 2) {
            // 处理父级内容
            let parentPath = pathArr.slice(0, -1)
            parentPath = `.${parentPath.join('/')}/index.vue`

            // 路由内容
            let route = {
                /**
                 * 名称规则：父级目录-子级目录
                 * 例子：/user/aboutMe -> user-aboutMe
                 */
                name: pathArr.filter(Boolean).join('-'),
                /**
                 * path规则：当前文件夹名小写，驼峰的前面加-转小写
                 * 例子：aboutMe -> about-me
                 */
                path: pathArr[arrLength - 1].replace(/([A-Z])/g, '-$1').toLowerCase(),
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
                helpObj[parentPath].children = [route]
            }

            // 增加到辅助函数中
            helpObj[r] = route
        } else {
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
auto(require.context( // eslint-disable-line
    // 查询路由的目录
    '@/views',
    // 是否查询子目录
    true,
    // 路由匹配规则
    // 对于是以 index.vue 或是 route.js 结尾的文件
    /(index\.vue$)|(route\.js$)/,
    // 启动懒加载
    'lazy'
))

/**
 * routes数据结构
 * [
 *    {
 *      name: 'home',
 *      path: '/',
 *      compoent: fun
 *    },
 *    {
 *      name: 'user',
 *      path: '/',
 *      compoent: fun,
 *      children: [{
 *          name: 'user-aboutMe',
 *          path: 'about-me',
 *          compoent: fun
 *      }]
 *    },
 * ]
 */
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