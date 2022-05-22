const initApis = vm => ({
	login: (params = {}) => vm.$u.post('/auth/login', params),
	getUserInfo: (params = {}) => vm.$u.post('/user/getUserInfo', params),
	getRecommendClassify: (params = {}) => vm.$u.post('/classify/getRecommendClassify', params),
	getClassifyImageList: (params = {}) => vm.$u.post('/classify/getClassifyImageList', params),
	getImageList: (params = {}) => vm.$u.post('/image/getImageList', params),
	getCurrentGroupBannerList: (params = {}) => vm.$u.post('/banner/getCurrentGroupBannerList', params),
	getImageInfo: (params = {}) => vm.$u.post('/image/getImageInfo', params),
})

export default initApis
