<template>
<div class="background-wrapper">
	<div v-for="(val, index) in imagesName"
		:key="index"
		:style="{backgroundImage: `url(/static/images/bg/${val}` }"
		:class="{'bg-item--active': isActivBg(index)}"
		class="bg-item">
		{{val}}
		</div>
</div>
</template>

<script>
export default {
	name: 'AppBackground',
	data () {
		return {
			Date: new Date().getSeconds(),
			imagesName: ['morning1.jpg', 'morning2.jpg', 'morning3.jpg', 'day1.jpg', 'day2.jpg', 'day3.jpg', 'night1.jpg', 'night2.jpg', 'night3.jpg'],
			imageActive: 0
		}
	},
	created () {
		this.setActiveImg()
		setInterval(() => {
			this.setActiveImg()
		}, 2700000)
	},
	methods: {
		isActivBg (index) {
			if (index === this.imageActive) {
				return true
			} else {
				return false
			}
		},
		setActiveImg () {
			let hours = new Date().getHours()
			if (hours > 6 && hours < 7) {
				this.imageActive = 0
			} else if (hours > 7 && hours < 8) {
				this.imageActive = 1
			} else if (hours > 8 && hours < 9) {
				this.imageActive = 2
			} else if (hours > 9 && hours < 10) {
				this.imageActive = 3
			} else if (hours > 10 && hours < 17) {
				this.imageActive = 4
			} else if (hours > 17 && hours < 18) {
				this.imageActive = 5
			} else if (hours > 18 && hours < 20) {
				this.imageActive = 6
			} else if (hours > 20 && hours < 24) {
				this.imageActive = 7
			} else {
				this.imageActive = 8
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.background-wrapper {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	z-index: -5;
}
.bg-item {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-repeat: no-repeat;
	background-position: 0 0;
	background-size: cover;
	filter: blur(10px);
	opacity: 0;
	transition: opacity 1s;
}
.bg-item--active {opacity: 1;}
</style>
