import Vue from 'vue'
import App from './App'
import request from './common/request.js'
import api from './common/api.js'
import url from './common/config.js'
Vue.config.productionTip = false

App.mpType = 'app'

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);
Vue.prototype.$request = request
Vue.prototype.$api = api
Vue.prototype.$url = url
const app = new Vue({
    ...App
})
app.$mount()
