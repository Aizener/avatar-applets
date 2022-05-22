import qs from 'qs'

const install = (Vue, vm) => {
	Vue.prototype.$u.http.setConfig({
		baseUrl: 'https://ddvlhr.red/pic-shot/',
		loadingText: '努力加载中~',
		loadingTime: 800,
		header: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Client-OS': 1
		}
	});
	
	Vue.prototype.$u.http.interceptor.request = (config) => {
		config.data = qs.stringify(config.data)
		config.header['alice-wonderland'] = `rabbit ${vm.mUser.auth.accessToken}`
		
		if(config.url == '/user/login') config.header.noToken = true
		return config
	}
	
	Vue.prototype.$u.http.interceptor.response = (res) => {
		if(res.code == 200) {
			return res
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
