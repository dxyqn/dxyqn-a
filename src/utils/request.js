import axios from 'axios'
import {
	Notification,
	MessageBox,
	Message
} from 'element-ui'
import store from '@/store'
import aes from './AES'
import { reject } from 'core-js/fn/promise'
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
	// axios中请求配置有baseURL选项，表示请求URL公共部分
	// baseURL: 'http://localhost:8131',
	baseURL: 'https://www.dxyqn.cn/server/',
	// 超时
	timeout: 10000
})
// request拦截器
service.interceptors.request.use(config => {
	// 是否需要设置 token
	const isToken = (config.headers || {}).isToken === false
	if (store.getters.getToken != '' && !isToken) {
		config.headers['token'] = store.getters.getToken // 让每个请求携带自定义token 请根据实际情况自行修改
	}
	console.log(config.data);
	if (config.data && !config.data.secret) {
		let obj = {
			param: aes.encrypt(JSON.stringify(config.data))
		}
		config.data = obj
	}
	return config
}, error => {
	console.log(error)
	Promise.reject(error)
})
// 响应拦截器
service.interceptors.response.use(async res => {
	console.log(res, "拦截器");
	// 未设置状态码则默认成功状态
	const code = res.data.code || "000";
	if (code == "000") {
		if (res.data.secret) {
			let obj = {
				code: res.data.code,
				msg: res.data.msg,
				data: JSON.parse(aes.decrypt(res.data.data))
			}
			return obj
		} else {
			let obj = {
				code: res.data.code,
				msg: res.data.msg,
				data: res.data.data
			}
			return obj
		}
	} else if (code == "3002") {
		store.commit("changeToken", res.data.data);
		let res2 = await serviceAsync(res.config.url,res.config.method,res.config.data);
		console.log(res2)	
		let obj = {
				code: res2.code,
				msg: res2.msg,
				data: res2.data
			}
			console.log(obj,"objjjj")
			return obj
	} else {
		Notification.error({
			title: res.data.msg
		})
		return Promise.reject(new Error(res.data.msg))
	}
})
async function serviceAsync(url,method,data){
let freshData = await service({
		url:url,
		method:method,
		data:data
	})
  return freshData
}
export default service
