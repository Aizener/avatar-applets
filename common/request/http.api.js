const { basename } = require('path')

const install = (Vue, vm) => {
	const api = {}, ctx = require.context('./api', false, /\.js/)
	ctx.keys().forEach(path => {
		const fileName = basename(path, '.js')
		const apiModule = ctx(path).default
		const apiObj = apiModule(vm)
		if (fileName === 'index') {
			Object.keys(apiObj).forEach(key => api[key] = apiObj[key])
		} else {
			api[fileName] = apiObj
		}
	})
	console.log(api)
	vm.$u.api = api
}

export default {
	install
}
