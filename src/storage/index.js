import Vue from 'vue'
import Vuex from 'vuex'
import winRecords from './modules/winRecords'
import calendar from './modules/calendar'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		winRecords,
		calendar
	}
})
