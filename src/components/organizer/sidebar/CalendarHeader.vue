<template>
	<header class="sidebar__calendar-header">
		<button
			@click="prewMonth()"
			class="header__control header__control--prew"></button>
			<div class="header__date">
				<span>{{isSelectDate}}</span>
			</div>
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
// ============ btn control =================================
$btn-size: 25px;
$before-size: 12px;
$bdrs: 4px;
$margin-btn: 5%;

.header__control {
	position: relative;
	width: $btn-size;
	height: $btn-size;
	background: transparent;
	border: var(--border);
	border-radius: $bdrs;
	transition: background-color .25s;
	cursor: pointer;

	&::before {
		content: '';
		position: absolute;
		top: 25%;
		width: $before-size;
		height: $before-size;
		border-top: var(--border);
		border-left: var(--border);
		border-radius: $bdrs;
	}

	&:hover {
		background-color: rgba(255,255,255, .5);
	}
}
.header__control--prew::before {
	transform: rotate(-45deg);
	left: 40%;
}
.header__control--next::before {
	transform: rotate(135deg);
	right: 30%;
}
</style>
