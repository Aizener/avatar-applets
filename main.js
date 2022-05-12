import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import Store from './store'
import uView from "uview-ui"
import httpInterceptor from '@/common/request/http.interceptor.js'
import httpApi from '@/common/request/http.api.js'
import './mixins/index'

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()

Vue
	.use(Store)
	.use(uView)
	.use(httpInterceptor, app)
	.use(httpApi, app)
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
