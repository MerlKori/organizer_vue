<template>
	<header class="sidebar__calendar-header">
		<button
			@click="prewMonth()"
			class="header__control header__control--prew"></button>
			<div class="header__date">{{isSelectDate}}</div>
		<button
				@click="nexMonth()"
				class="header__control header__control--next"></button>
	</header>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
	name: 'CalendarHeader',
	data () {
		return {}
	},
	methods: {
		prewMonth () {
			this.$emit('showPrewMonth')
		},
		nexMonth () {
			this.$emit('showNextMonth')
		}
	},
	computed: {
		...mapGetters('calendar', ['isSelectDate'])
	}
}
</script>

<style lang="scss" scoped>
.sidebar__calendar-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	padding: 10px;
	border-bottom: var(--border);
	color: var(--text-color-whithe);
}
.header__date {
	font-size: 1.1rem;
	color: rgba(255,255,255, .7);
}
// ============ btn control =================================
$btn-size: 25px;
$before-size: 15px;
$bdrs: 5px;
$margin-btn: 5%;
$bd: 3px solid rgba(255,255,255, .6);

.header__control {
	position: relative;
	width: $btn-size;
	height: $btn-size;
	background: transparent;
	border-radius: $bdrs;
	transition: background-color .25s;
	cursor: pointer;

	&::before {
		content: '';
		position: absolute;
		top: 25%;
		width: $before-size;
		height: $before-size;
		border-top: $bd;
		border-left: $bd;
		border-radius: $bdrs;
	}
}
.header__control--prew {
	&::before {
		transform: rotate(-45deg);
		left: 40%;
	}
	&:active::before {
		transform: rotate(-45deg) scale(.9);
	}
}
.header__control--next {
	&::before {
		transform: rotate(135deg);
		right: 30%;
	}
	&:active::before {
		transform: rotate(135deg) scale(.9);
	}
}
</style>
