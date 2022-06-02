export default {
	install: Vue => {
		Vue.prototype.$toast = (title, duration = 3000, icon = 'none') => {
			uni.showToast({
				duration,
				title,
				icon
			})
		},
		Vue.prototype.$confirm = ({
			title = '提示',
			content
		}) => {
			return new Promise((resolve, reject) => {
				uni.showModal({
					title,
					content,
					success: res => {
						resolve(res)
					},
					fail: err => {
						reject(err)
					}
				})
			})
		},
		Vue.prototype.$setTitle = title => {
			uni.setNavigationBarTitle({
				title
			})
		},
		Vue.prototype.$showLoading = (title = '加载中', mask = false) => {
			uni.showLoading({
				title,
				mask
			})
		},
		Vue.prototype.$hideLoading = () => {
			uni.hideLoading()
		},
		Vue.prototype.$getBounding = function (selector) {
			return new Promise(resolve => {
				uni
					.createSelectorQuery()
					.in(this)
					.select(selector)
					.boundingClientRect(res => {
						resolve(res)
					}).exec()
			})
		},
		Vue.prototype.$previewImage = (urls) => {
			uni.downloadFile({
				url: urls[0],
				success: ({ tempFilePath }) => {
					uni.previewImage({
						urls: [tempFilePath],
						longPressActions: false,
						success: () => {
							console.log('ok')
						},
						fail: err => {
							console.log('preview err', err)
							Vue.prototype.$toast(err)
						}
					})
				}
			})
		}
	}
}
