import Vue from 'vue'
import App from './App'
import store from './storage/index'
import router from './router/router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	store,
	router,
	components: { App },
	template: '<App/>'
})
