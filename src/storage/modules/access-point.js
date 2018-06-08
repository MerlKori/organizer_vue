const state = {
	accessKey: 'str'
}

const mutations = {
	setKey (state, key) {
		state.accessKey = key
		localStorage.setItem('id', key)
	}
}

export default {
	namespaced: true,
	state,
	mutations
}
