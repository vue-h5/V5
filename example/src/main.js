import Vue from 'vue'
import App from './App.vue'
import router from './router/'
import store from './store/'
import './assets/js/autoComponent'
import V5 from '../../src/index.js'
// import V5 from '../../dist/v5.es6.js'
import veeValidate, { Validator } from 'vee-validate'
// 引入中文
import zh_CN from 'vee-validate/dist/locale/zh_CN'

Vue.config.productionTip = false
Vue.use(V5)
Vue.use(veeValidate)

Validator.localize('zh', zh_CN)

// 展示加载页面进度功能
router.beforeEach((to, from, next) => {
    V5.v5LoadingBar.start()
    next()
})

router.afterEach((to, from) => {
    V5.v5LoadingBar.finish()
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
