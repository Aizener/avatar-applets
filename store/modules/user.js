const userStore = {
	state: {
		user: null,
		token: null
	},
	mutations: {
		muUpdateUser(state, user) {
			state.user = user
		}
	},
	namespaced: true
}

export default userStore
