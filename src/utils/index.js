import marked from 'marked'
import xss from 'xss'
import hljs from 'highlight.js'
// 转化 md 语法为 html
export const translateMarkdown = (plainText, isGuardXss = false) => {
	return marked(isGuardXss ? xss(plainText) : plainText, {
		renderer: new marked.Renderer(),
		gfm: true,
		pedantic: false,
		sanitize: false,
		tables: true,
		breaks: true,
		smartLists: true,
		smartypants: true,
		 langPrefix:"hljs language-",
		highlight: function(code) {
			/*eslint no-undef: "off"*/
			return hljs.highlightAuto(code,['javaScript','CSS','html','vue','es6','java','Python','Shell','SQL','XML','matlab','C','PHP','Ruby']).value
		}
	})
}
// 计算 评论数
export const calcCommentsCount = commentList => {
	let count = commentList.length
	commentList.forEach(item => {
		count += item.replies.length
	})
	return count
}
export function clearObject(obj) {
	/* 判断是否为obj */
	if (obj instanceof Array) {
		return 'Array'
	} else if (obj instanceof Object) {
		Object.keys(obj).map(key => {
			obj[key] = '';
		});
	}
}
