const install = (Vue, vm) => {
	Vue.prototype.$u.http.setConfig({
		baseUrl: 'https://api.example.com',
		loadingText: '努力加载中~',
		loadingTime: 800
	});
	
	Vue.prototype.$u.http.interceptor.request = (config) => {
		config.header.Token = 'xxxxxx'
		
		if(config.url == '/user/login') config.header.noToken = true
		return config
	}
	
	Vue.prototype.$u.http.interceptor.response = (res) => {
		if(res.code == 200) {
			return res.result
		} else if(res.code == 201) {
			vm.$u.toast('验证失败，请重新登录')
			setTimeout(() => {
				vm.$u.route('/pages/user/login')
			}, 1500)
			return false
		} else {
			return false
		}
	}
}

export default {
	install
}
