const state = {
	todayDate: {
		day: new Date().getDate(),
		month: new Date().getMonth(),
		year: new Date().getFullYear()
	},
	selectDate: {
		day: '',
		month: '',
		year: ''
	},
	monthTitle: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
}

const mutations = {
	showNexMonth (state) {
		if (state.selectDate.month >= 11) {
			state.selectDate.month = 0
			state.selectDate.year++
		} else {
			state.selectDate.month++
		}
	},
	showPrewMonth (state) {
		if (state.selectDate.month <= 0) {
			state.selectDate.month = 11
			state.selectDate.year--
		} else {
			state.selectDate.month--
		}
	},
	goTodaytDate (state) {
		state.selectDate.day = state.todayDate.day
		state.selectDate.month = state.todayDate.month
		state.selectDate.year = state.todayDate.year
	},
	defaultSelectDate (state) {
		state.selectDate.day = state.todayDate.day
		state.selectDate.month = state.todayDate.month
		state.selectDate.year = state.todayDate.year
	}
}

const getters = {
	isSelectDate () {
		return `${state.selectDate.day} ${state.monthTitle[state.selectDate.month]} ${state.selectDate.year}`
	},
	isTodayDate () {
		return `${state.todayDate.day} ${state.monthTitle[state.todayDate.month]} ${state.todayDate.year}`
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	getters
}
