import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		token: '',
		isHome: false,
		toUrl: '', //即将要去的url
		isLogin: false, //是否登录
		categoryList: [],
	},
	getters: {
		getToken(state) {
			return state.token
		},
		getIsHome(state) {
			return state.isHome
		},
		getToUrl(state) {
			return state.toUrl
		},
		getIslogin(state) {
			return state.isLogin
		},
		getCategoryList(state) {
			return state.categoryList
		},
	},
	mutations: {
		changeToken(state, value) {
			state.token = value;
		},
		changeIsHome(state, value) {
			state.isHome = value
		},
		changeToUrl(state, value) {
			state.toUrl = value
		},
		changeIsLogin(state, value) {
			state.isLogin = value
		},
		changeCategoryList(state, value) {
			state.categoryList = value;
		},
	}
})
export default store
