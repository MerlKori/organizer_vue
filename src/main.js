import Vue from 'vue'
import App from './App'
import router from './router/router'
import store from './storage/storage'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: { App },
	template: '<App/>'
})
