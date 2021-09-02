import request from '@/utils/request'
import aes from '../utils/AES.js'
/* 获取菜单信息 */
export function getMenu(data){
	return request({
	  url: '/queryArticle',
	  method: 'post',
	  data: data
	})
}
/* 获取首页标签 */
export function getTag(){
	return request({
	  url: '/getDict',
	  method: 'get',
	})
}
/* 登录存储token */
export function login(userName,password){
	const data = {
		userName:userName,
		password:password,
	}
	return request({
	  url: '/getUserAll',
	  method: 'post',
	  data: data
	})
}
/* 登录存储token */
export function register(userName,password,mail,token){
	const data = {
		userName:userName,
		password:password,
		mail:mail,
	}
	return request({
	  url: '/addUser',
	  method: 'post',
	  data: data
	})
}
/* 获取验证码 */
export function getCode(userName){
	const data = {
		userName:userName
	}
	return request({
	  url: '/getCode',
	  method: 'post',
	  data: data
	})
}
/* 忘记密码重置密码 */
export function checkCode(data){
	return request({
	  url: '/updatePassword',
	  method: 'post',	
	  data: data
	})
}