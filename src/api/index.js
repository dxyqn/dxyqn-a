import request from '@/utils/request'
import aes from '../utils/AES.js'
/* ToDo操作 */
export function Todo(data){
	return request({
	  url: '/Todo',
	  method: 'post',
	  data: data
	})
}