const state = {
	listValue: [{
		value: 'Low',
		color: '#42A645'
	},
	{
		value: 'Medium',
		color: '#F9C120'
	},
	{
		value: 'Highest',
		color: '#ff3d00'
	}],
	selectVal: 'Low',
	colorTitle: '#42A645'
}

const mutations = {
	selectValue (state, id) {
		state.selectVal = state.listValue[id].value
		state.colorTitle = state.listValue[id].color
	},
	setDefaultEditVal (state, payload) {
		state.selectVal = payload.value
		state.colorTitle = payload.color
	}
}

export default {
	namespaced: true,
	state,
	mutations
}
