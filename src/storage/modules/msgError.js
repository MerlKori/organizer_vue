const state = {
	msgErrorVisibility: false,
	msgTitle: 'error'
}

const mutations = {
	showMsgError (state, title) {
		state.msgTitle = title
		console.log(state.msgTitle)
		state.msgErrorVisibility = true
		setTimeout(() => {
			state.msgErrorVisibility = false
		}, 4000)
	}
}

export default {
	namespaced: true,
	state,
	mutations
}
