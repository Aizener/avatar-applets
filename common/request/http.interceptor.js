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
		console.log('request: ', config)
		if (vm.mUser && vm.mUser.auth) {
			config.header['alice-wonderland'] = `rabbit ${vm.mUser.auth.accessToken}`
		} else {
			if (config.url !== '/auth/login') {
				// vm.$toast('登录信息已过期')
				let storage = uni.getStorageSync('vuex')
				if (storage) {
					storage = JSON.parse(storage)
					delete storage.userStore
					uni.setStorageSync('vuex', JSON.stringify(storage))
				}
			}
		}
		
		if(config.url == '/user/login') config.header.noToken = true
		return config
	}
	
	Vue.prototype.$u.http.interceptor.response = (res) => {
		console.log('response:', res)
		return res
	}
}

export default {
	install
}
