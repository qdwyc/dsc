import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
//先下载cnpm install mint-ui --save
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

// 一个用于移动端的可触摸滑动具有回弹效果的可复用Vue组件
//下载 cnpm install ly-tab --save
import LyTab from 'ly-tab'
Vue.use(LyTab)
//导入路由模块
import router from "./router/router.js"

import store from "./store/index"

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
