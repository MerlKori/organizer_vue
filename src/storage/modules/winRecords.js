const state = {
	flagTaskItem: false,
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
	},
	toggleFlag (state) {
		state.flagTaskItem = !state.flagTaskItem
	}
}

const actions = {
	doFilter ({commit}, payload) {
		commit('filterRecords', payload)
		console.log(state.eventsDataList)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
