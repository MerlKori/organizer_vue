<template>
<header class="organizer__header">
	<div
		@click="goToday()"
		class="header__dateToday">
		<span class="header__today-month">{{dataTitle.today}} </span>
		<span class="header__today-month">{{dataTitle.monthTitle[dataTitle.month]}} </span>
		<span class="header__today-year">{{dataTitle.year}}</span>
	</div>
	<div class="header__bottom">
		<button
			@click="prewMonth()"
			class="header__control header__control--prew"></button>
		<div class="header__today-date">
			<span class="header__today-month">{{dataTitle.selectDay}} </span>
			<span class="header__today-month">{{dataTitle.monthTitle[dataTitle.selectMonth]}} </span>
			<span class="header__today-year">{{dataTitle.selectYear}}</span>
		</div>
		<button
				@click="nexMonth()"
				class="header__control header__control--next"></button>
	</div>
</header>
</template>

<script>
export default {
	name: 'OrganizerHeader',
	props: {
		dataTitle: {
			type: Object,
			required: true
		}
	},
	data () {
		return {}
	},
	methods: {
		prewMonth () {
			this.$emit('showPrewMonth')
		},
		nexMonth () {
			this.$emit('showNextMonth')
		},
		goToday () {
			this.$emit('showCurrentDate')
		}
	}
}
</script>

<style lang="scss" scoped>
.organizer__header {
	background-color: #E56F75;
	padding: 10px 10px;
}
.header__dateToday,
.header__bottom {
	max-width: 1170px;
	margin: 0 auto;
	color: #fff;
}
.header__dateToday {
	text-align: center;
	cursor: pointer;
}
.header__bottom {
	display: flex;
	align-items: center;
	justify-content: space-around;
}
.header__control {
	position: relative;
	width: 35px;
	height: 20px;
	background: transparent;
	border: 1px solid #fff;
	border-radius: 4px;
	cursor: pointer;

	&::before {
		content: '';
		position: absolute;
		top: 35%;
	}
}
</style>
