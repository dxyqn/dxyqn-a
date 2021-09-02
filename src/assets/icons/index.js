import Vue from 'vue'
import BaseSvg from '@/components/BaseSvg'// svg component

// register globally
Vue.component('base-svg', BaseSvg)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
