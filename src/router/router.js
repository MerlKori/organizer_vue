import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/pages/Main'

Vue.use(Router)

export const routesList = {
	main: '/'
}

export default new Router({
	routes: [
		{path: '/', component: Main}
	],
	scrollBehavior (to, from, savedPosition) {
		return {x: 0, y: 0}
	}
})
