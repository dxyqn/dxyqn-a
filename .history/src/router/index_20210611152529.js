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
	{
		path: '/home',
		name: 'home',
		component: () => import('@/views/home.vue'),
		meta:{
			keepAlive:true
		}
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login.vue'),
		meta:{
			keepAlive:false
		}
	},
	{
		path: '/file',
		name: 'file',
		component: () => import('@/views/file.vue'),
		meta:{
			keepAlive:false
		}
	},
	{
		path: '/markdown/detail',
		name: 'markdownDetail',
		component: () => import('@/views/markdown/detail.vue'),
		meta:{
			keepAlive:false
		}
	},
	{
		path: '/markdown/increase',
		name: 'increaseMarkdown',
		component: () => import('@/views/markdown/increaseMarkdown.vue'),
		meta:{
			keepAlive:false
		}
	},
	{
		path: '/markdown/myMarkdown',
		name: 'lookMyMarkdown',
		component: () => import('@/views/markdown/myMarkdown.vue'),
		meta:{
			keepAlive:true
		}
	},
	{
		path: '/bookmark',
		name: 'bookmark',
		component: () => import('@/views/bookMark/bookMark.vue'),
		meta:{
			keepAlive:true
		}
	},
	{
		path: '/bookmark/detail',
		name: 'bookmarkDetail',
		component: () => import('@/views/bookMark/detail.vue'),
		meta:{
			keepAlive:false
		}
	},
	{
		path: '/aboutUs',
		name: 'aboutUs',
		component: () => import('@/views/aboutUs.vue'),
		meta:{
			keepAlive:true
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
	const token = store.getters.getToken;
	console.log(store.getters.getIsHome)
	//跳转至上述3个页面
	//已登录的情况再去登录页，跳转至首页
	if (!store.getters.getIsHome) {
		console.log(to.path)
		if(to.path!=='/home'){
			router.push({
				path: '/home'
			});
			next()
		}else{
			next()
		}
	} else {
		console.log(store.getters.getIslogin);
		if (to.path == '/markdown/increase' || to.path == "/markdown/myMarkdown" || to.path == '/bookmark' || to.path == '/file') {
			console.log(token);
			if (token == "") {
				console.log(to.path);
				switch (to.path) {
					case "/markdown/increase":
					    store.commit('changeToUrl',to.path)
						Message.error("请登录后编写文章");
						break;
					case "/markdown/myMarkdown":
					    store.commit('changeToUrl',to.path)
						Message.error("请登录后查看我的文章");
						break;
					case "/bookmark":
					    store.commit('changeToUrl',to.path)
						Message.error("请登录后查看我的文章");
						break;
					case "/file":
						store.commit('changeToUrl',to.path)
						Message.error("请登录后查看归档");
				}
				next('/login')
			} else {
				next();
			}
		}
		if(store.getters.getIslogin && to.path == '/login'){
			next('/')
		}else{
			next();
		}
		
	}
});
export default router
