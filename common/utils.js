export default {
	install: Vue => {
		Vue.prototype.$toast = (title, duration = 3000, icon = 'none') => {
			uni.showToast({
				duration,
				title,
				icon
			})
		},
		Vue.prototype.$setTitle = title => {
			uni.setNavigationBarTitle({
				title
			})
		}
	}
}
