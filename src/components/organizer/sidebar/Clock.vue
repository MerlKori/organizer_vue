<template>
<div class="clock">
	<span class="clock__time">{{hours}}</span>
	<span class="clock__sign">:</span>
	<span class="clock__time">{{minutes}}</span>
	<span class="clock__sign">:</span>
	<span class="clock__time">{{seconds}}</span>
</div>
</template>

<script>
export default {
	name: 'Clock',
	data () {
		return {
			hours: '',
			minutes: '',
			seconds: ''
		}
	},
	created () {
		this.getTimeClock()
		setInterval(() => {
			this.getTimeClock()
		}, 1000)
	},
	methods: {
		getTimeClock () {
			let date = new Date()

			if (date.getHours() < 10) {
				this.hours = `0${date.getHours()}`
			} else {
				this.hours = date.getHours()
			}

			if (date.getMinutes() < 10) {
				this.minutes = `0${date.getMinutes()}`
			} else {
				this.minutes = date.getMinutes()
			}

			if (date.getSeconds() < 10) {
				this.seconds = `0${date.getSeconds()}`
			} else {
				this.seconds = date.getSeconds()
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.clock {
	display: flex;
	align-items: center;
	justify-content: center;
	margin: auto auto 25px;
	min-width: 200px;
	border: 1px solid rgba(255,255,255, .7);
	border-radius: 7px;
}
.clock__time {
	font-size: 2rem;
	color: rgba(255,255,255, .7);
	margin: 0 10px;
}
.clock__sign {
	font-size: 1.3rem;
	color: rgba(255,255,255, .8);
}
</style>
