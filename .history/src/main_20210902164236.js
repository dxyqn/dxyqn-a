import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import router from './router'
import store from './store/index.js'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
// import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/scss/element-variables.scss'
import 'element-ui/lib/theme-chalk/display.css'
import '@/common/common.scss'
import globalMixin from '@/common/globalMixin.js'
/* markdown编辑器 */
import {components} from 'load-vue' 
import './assets/icons' 
Vue.use(components.YsLoad3)
Vue.mixin(globalMixin)
Vue.config.productionTip = false
Vue.use(ElementUI)
const requireComponent = require.context(
  // 其组件目录的相对路径
  './components',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /Base[A-Z]\w+\.(vue|js)$/
)
requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)

  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 剥去文件名开头的 `./` 和结尾的扩展名
      fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
    )
  )

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
