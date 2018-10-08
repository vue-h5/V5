import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import V5 from '../../src/'

Vue.config.productionTip = false
Vue.config.devtools = true

Vue.use(V5)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
