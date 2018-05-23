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
			imagesName: ['morning.jpg', 'day.jpg', 'evening.jpg', 'night.jpg'],
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

			if (hours >= 0 && hours <= 9) {
				this.imageActive = 0
			} else if (hours > 9 && hours <= 16) {
				this.imageActive = 1
			} else if (hours > 16 && hours <= 20) {
				this.imageActive = 2
			} else if (hours > 20 && hours < 24) {
				this.imageActive = 3
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
