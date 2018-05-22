const state = {
	eventsDataList: [],
	allRecords: []
}

const mutations = {
	filterRecords (state, payload) {
		state.eventsDataList = []
		state.eventsDataList = payload.answerArr.filter(item => {
			if (item.date === payload.selectData) {
				return item
			}
		})
	},
	getAllRecords (state, arr) {
		state.allRecords = arr
	}
}

const actions = {
	doFilter ({commit}, payload) {
		commit('filterRecords', payload)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
