import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home/index.vue'

Vue.use(Router)

// https://webpack.docschina.org/api/module-methods/#import-
const loadView = view => () => import(/* webpackChunkName: "[request]" */ `@/views/${view}/index.vue`)

export default new Router({
	routes: [
		{
			path: '/',
			component: Home
		},
		{
			path: '/about',
			component: loadView('about')
		}
	]
})
