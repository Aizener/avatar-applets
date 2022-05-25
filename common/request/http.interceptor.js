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
		if (vm.mUser) {
			config.header['alice-wonderland'] = `rabbit ${vm.mUser.auth.accessToken}`
		}
		
		if(config.url == '/user/login') config.header.noToken = true
		return config
	}
	
	Vue.prototype.$u.http.interceptor.response = (res) => {
		return res
	}
}

export default {
	install
}
