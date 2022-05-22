import Vue from 'vue'
import Vuex from 'vuex'
import createVuexPersistedState from './plugins/vuex-persistedstate'
import userStore from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		msg: 'hello vuex.',
		searchList: []
	},
	mutations: {
		updateState(state, { key, value }) {
			console.log(key, value)
			state[key] = value
		}
	},
	modules: {
		userStore
	},
	plugins: [createVuexPersistedState({
		modules: ['searchList', 'userStore']
	})]
})
export default store