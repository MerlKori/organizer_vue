<template>
<transition name="translate">
	<div
		v-show="msgErrorVisibility"
		class="msg-err">
		<h6 class="msg-err__title">{{msgTitle}}</h6>
	</div>
</transition>
</template>

<script>
import {mapState} from 'vuex'
export default {
	name: 'MsgAutorizationError',
	data () {
		return {}
	},
	computed: {
		...mapState('msgError', ['msgErrorVisibility', 'msgTitle'])
	}
}
</script>

<style>
.msg-err {
	position: fixed;
	top: 10px;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	max-width: 380px;
	padding: 8px 10px;
	background-color: rgba(245,108,108, .6);
	border-radius: 4px;
	z-index: 100;
	transition: top .45s , opacity .45s ;
}
.msg-err__title {
	font-size: 14px;
	color: #FFF;
}
.translate-enter,
.translate-leave-to {
	top: -50px;
	opacity: 0;
}
</style>
