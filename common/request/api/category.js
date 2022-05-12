const initApis = vm => ({
	getDemo: (params = {}) => vm.$u.get('/getDemo', params)
} )

export default initApis
