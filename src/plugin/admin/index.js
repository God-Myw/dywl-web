// Element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import config from '@/config/config'
// import globalV from '@/store/global_variable'
// import globalAll from '@/store/global_variableAll'
// import globalStamp from '@/store/global_variable_stamp'

// 组件
import '@/components/index.js'
export default {
  async install(Vue) {
    // 设置为 false 以阻止 vue 在启动时生成生产提示。
    Vue.config.productionTip = false
    // 当前环境
    Vue.prototype.$env = process.env.NODE_ENV
    // 判断正式或者测试地址
    Vue.prototype.$serverUrl =
      process.env.NODE_ENV === 'development'
        ? config.development
        : config.production
    // Vue.prototype.constVar = globalV
    // Vue.prototype.constTime = globalAll
    // Vue.prototype.constStamp = globalStamp
    // Element
    Vue.use(ElementUI)
  }
}
