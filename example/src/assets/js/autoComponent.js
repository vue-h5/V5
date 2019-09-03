import Vue from 'vue'

const requireComponent = require.context(
  // 其组件目录的相对路径
  '@/components',
  // 是否查询其子目录
  true,
  // 匹配基础组件文件名的正则 
  // 我们只对以 index.vue 和 index.js 结束的文件自动注册
  /index\.(vue|js)$/
)

const requireModule = require.context(
  // 其组件目录的相对路径
  '@/module',
  // 是否查询其子目录
  true,
  // 匹配基础组件文件名的正则 
  // 我们只对以 index.vue 和 index.js 结束的文件自动注册
  /index\.(vue|js)$/
)

requireComponent.keys().forEach(name => {
  registered(name, requireComponent)
})
requireModule.keys().forEach(name => {
  registered(name, requireModule)
})

function registered (fileName, requireCtx) {
  // 获取组件的配置
  const componentConfig = requireCtx(fileName)
  let componentName = ''

  // 全局注册组件
  let setComponent = function (name, config) {
    Vue.component(
      name,
      // 如果这个组件选项是通过 `export default` 导出的，
      // 那么就会优先使用 `.default`，
      // 否则回退到使用模块的根。
      config.default || config
    )
  }

  // 对于是 index.js 的组件，我们要为其内部子组件独立注册
  if (fileName.endsWith('.js')) {
    Object.keys(componentConfig).forEach(module => {
      setComponent(module, componentConfig[module])
    })
  } else {
    // 获取组件名称
    componentName = fileName.slice(2, -10)

    setComponent(componentName, componentConfig)
  }
}