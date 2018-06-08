import Vue from 'vue'
import Router from 'vue-router'

import Authorization from '@/pages/Authorization'
import Organizer from '@/pages/Organizer'

Vue.use(Router)

export const routesList = {
	authorization: '/',
	organizer: '/organizer'
}

export default new Router({
	routes: [
		{
			path: '/',
			component: Authorization
		},
		{
			path: '/organizer',
			component: Organizer
		}
	],
	scrollBehavior (to, from, savedPosition) {
		return {x: 0, y: 0}
	}
})
