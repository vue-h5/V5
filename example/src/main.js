import Vue from 'vue'
import VeeValidate from 'vee-validate'
import App from './App.vue'
import router from './router'
import store from './store'
import V5 from '../../src/index.js'
// import V5 from '../../dist/v5.es6.js'

Vue.config.productionTip = false
Vue.config.devtools = true

Vue.use(VeeValidate)
Vue.use(V5)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
