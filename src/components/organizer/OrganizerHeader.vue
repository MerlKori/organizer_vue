<template>
<header class="organizer__header">
	<div class="header__content">
		<button
			@click="prewMonth()"
			class="header__control header__control--prew"></button>
		<div class="header__date">
			<div
			@click="goToday()"
			class="header__date-today">
				<span class="header__date-title">Today</span>
				<span >{{dataTitle.today}} </span>
				<span >{{dataTitle.monthTitle[dataTitle.month]}} </span>
				<span >{{dataTitle.year}} </span>
			</div>
			<div >
				<span class="header__date-title">/ Selected date </span>
				<span >{{dataTitle.selectDay}} </span>
				<span >{{dataTitle.monthTitle[dataTitle.selectMonth]}} </span>
				<span >{{dataTitle.selectYear}}</span>
			</div>
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
.header__content {
	display: flex;
	align-items: center;
	max-width: 1170px;
	margin: 0 auto;
	color: #fff;
}

.header__date {
	display: flex;
	margin: 0 auto;

	span {
		margin: 0 2px;
	}
}
.header__date-title {
	font-weight: 700;
	color: #000;
}
.header__date-today {
	margin-right: 5px;
	cursor: pointer;
}
// header-btn variables
$btn-size: 30px;
$before-size: 15px;
$bd-color: #fff;
$bd-width: 1px;
$bdrs: 4px;
$margin-btn: 5%;
// header-btn variables end
.header__control {
	position: relative;
	width: $btn-size;
	height: $btn-size;
	background: transparent;
	border: $bd-width solid $bd-color;
	border-radius: $bdrs;
	transition: background-color .25s;
	cursor: pointer;

	&::before {
		content: '';
		position: absolute;
		top: 25%;
		width: $before-size;
		height: $before-size;
		border-top: $bd-width solid $bd-color;
		border-left: $bd-width solid $bd-color;
		border-radius: $bdrs;
	}

	&:hover {
		background-color: rgba(255,255,255, .5);
	}
}
.header__control--prew {
	margin-left: $margin-btn;

	&::before {
		transform: rotate(-45deg);
		left: 40%;
	}
}
.header__control--next {
	margin-right: $margin-btn;

	&::before {
		transform: rotate(135deg);
		right: 30%;
	}
}
</style>
