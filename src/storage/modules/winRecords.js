const state = {
	visible: false,
	erecordsList: []
}

const mutations = {
	toggleVisible (state) {
		state.visible = !state.visible
	},
	filterRecords (state, payload) {
		state.eventsDataList = []
		state.eventsDataList = payload.answerArr.filter(item => {
			if (item.date === payload.selectData) {
				return item
			}
		})
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
