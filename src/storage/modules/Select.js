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
		color: '#D23949'
	}],
	selectVal: 'Low',
	colorTitle: '#42A645'
}

const mutations = {
	selectValue (state, id) {
		state.selectVal = state.listValue[id].value
		state.colorTitle = state.listValue[id].color
	}
}

export default {
	namespaced: true,
	state,
	mutations
}
