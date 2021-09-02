import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
     //Todo:"",
	},
	getters: {
	// getTodo(state){
	// 		return state.Todo
	// 	}
	},
	mutations: {
		// changeTodo(state,value){
		// 	state.Todo = value
		// }
	}
})
export default store
