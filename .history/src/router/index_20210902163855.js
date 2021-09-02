import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index.js'
import {
	Message
} from 'element-ui'
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}
export const constantRoutes = [{
		path: '/',
		name: 'index',
		component: () => import('@/views/index.vue'),
		meta:{
			keepAlive:false
		}
	},
]
const router = new Router({
	mode: 'hash', // 去掉url中的#
	// base:'/web/',
	path:'/',
	scrollBehavior: () => ({
		y: 0
	}),
	routes: constantRoutes
})
router.beforeEach(function(to, from, next) {
	// const token = store.getters.getToken;
	// console.log(store.getters.getIsHome)
  // 前置路由导航
	let Todo =true;
	if (Todo) {
			next()
	} else {
		// Todo
	}
});
export default router
