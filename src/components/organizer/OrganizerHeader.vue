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
				<span class="header__date-title">Today :</span>
				<span>{{isTodayDate}}</span>
			</div>
			<div >
				<span class="header__date-title">/ Selected date : </span>
				<span>{{isSelectDate}}</span>
			</div>
		</div>
		<button
				@click="nexMonth()"
				class="header__control header__control--next"></button>
	</div>
	<div class="header__bottom-border"></div>
</header>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
	name: 'OrganizerHeader',
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
	},
	computed: {
		...mapGetters('calendar', ['isSelectDate', 'isTodayDate'])
	}
}
</script>

<style lang="scss" scoped>
.organizer__header {
	position: relative;
	background-color: #0d47a1;
	padding: 10px 0;
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
		font-size: 1.25rem;
		margin: 0 2px;
	}
}
.header__date-title {
	font-weight: 700;
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
.header__bottom-border {
	position: absolute;
	bottom: -2px;
	left: 50%;
	transform: translateX(-50%);
	width: 98%;
	height: 2px;
	border-radius: 100%;
	background-color: #fff;
}
</style>
