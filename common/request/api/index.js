const initApis = vm => ({
	login: (params = {}) => vm.$u.post('/auth/login', params),
	getUserInfo: (params = {}) => vm.$u.post('/user/getUserInfo', params),
	getRecommendClassify: (params = {}) => vm.$u.post('/classify/getRecommendClassify', params),
	getClassifyImageList: (params = {}) => vm.$u.post('/classify/getClassifyImageList', params),
	getImageList: (params = {}) => vm.$u.post('/image/getImageList', params),
	getCurrentGroupBannerList: (params = {}) => vm.$u.post('/banner/getCurrentGroupBannerList', params),
	getImageInfo: (params = {}) => vm.$u.post('/image/getImageInfo', params),
	getTagList: (params = {}) => vm.$u.post('/tag/getTagList', params),
	getAllClassify: (params = {}) => vm.$u.post('/classify/getAllClassify', params),
	downloadCheck: (params = {}) => vm.$u.post('/user/downloadCheck', params),
	getMyImageList: (params = {}) => vm.$u.post('/user/getMyImageList', params),
	collectImage: (params = {}) => vm.$u.post('/user/collectImage', params),
	pushUserFeedback: (params = {}) => vm.$u.post('/user/pushUserFeedback', params),
})

export default initApis
