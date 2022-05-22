/**
 * 把state设置到缓存里
 * @param {string} key 缓存key
 * @param {string} type 缓存类型
 * @param {string} state 序列化成字符串的state
 */
const setStorageState = (key, type, state) => {
	switch(type) {
		case 'localStorage':
			localStorage.setItem(key, state)
			break
		case 'sessionStorage':
			sessionStorage.setItem(key, state)
			break
		case 'uniStorage':
			uni.setStorageSync(key, state)
			break
	}
}

/**
 * 
 * @param {Object} config 配置信息 
 * @param {Object} store Vuex的Store
 * @param {Object} state Vuex的State
 * @returns void
 */
const storageState = (config, store, state) => {
	if (config.modules instanceof Array && config.modules.length === 0) {
		setStorageState(config.key, config.type, JSON.stringify(state))
		return
	}
	const storageState = {}
	config.modules.forEach(m => {
		if (store.hasModule(m)) {
			storageState[m] = JSON.stringify(state[m])
		} else {
			storageState[m] = typeof state[m] === 'object' ? JSON.stringify(state[m]) : state[m]
		}
	})
	setStorageState(config.key, config.type, JSON.stringify(storageState))
}

/**
 * 把storage序列化为对象
 * @param {Object} store Vuex Store
 * @param {Object} storage 缓存数据
 */
const toJSON = (store, storage) => {
	const target = {}
	for (let k in storage) {
		if (store.hasModule(k)) {
			const m = storage[k]
			try {
				target[k] = toJSON(store, JSON.parse(m))
			} catch(err) {
				target[k] = toJSON(store, JSON.parse(JSON.stringify(m)))
			}
		} else {
			try {
				target[k] = JSON.parse(storage[k])
			} catch(err) {
				target[k] = JSON.parse(JSON.stringify(storage[k]))
			}
		}
	}
	return target
}

/**
 * 初始化state
 * @param {Object} config 配置信息
 * @param {Object} store Vuex的Store
 */
const initState = (config, store) => {
	let storageState = uni.getStorageSync(config.key)
	if (storageState) {
		storageState = JSON.parse(storageState)
		const replaceState = toJSON(store, storageState)
		store.replaceState(Object.assign(store.state, replaceState))
	}
}

/**
 * 创建插件函数
 * @param {Object} options 配置信息 
 * @returns Vuex插件函数
 */
const createPersitedPlugin = options => {
	const config = {
		key: 'vuex',
		type: 'uniStorage',
		modules: []
	}
	Object.assign(config, options)
	return store => {
		initState(config, store)
		let prevState = {}
		store.subscribe((mutation, state) => {
			let nextState = JSON.parse(JSON.stringify(state))
			storageState(config, store, state)
			prevState = nextState
		})
	}
}

export default createPersitedPlugin