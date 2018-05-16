import Vue from 'vue'
import Vuex from 'vuex'
import winRecords from './modules/winRecords'
import calendar from './modules/calendar'
import Select from './modules/Select'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		winRecords,
		calendar,
		Select
	}
})
