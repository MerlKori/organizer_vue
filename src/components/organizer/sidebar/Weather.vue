<template>
<div class="weather">
	<img class="weather__icon" src="../../../assets/images/weather-icon.png" alt="">
	<div class="weather__data-wrap">
		<div class="weather__city">{{weatherData.name}}</div>
		<div class="weather__temp">{{defaultTemp}}</div>
	</div>
</div>
</template>

<script>
export default {
	name: 'Weather',
	data () {
		return {
			weatherData: {}
		}
	},
	created () {
		this.getWeather()
		setInterval(() => {
			this.getWeather()
		}, 1800000)
	},
	methods: {
		getWeather () {
			const xhr = new XMLHttpRequest()
			xhr.onreadystatechange = () => {
				if (xhr.readyState === 4 && xhr.status === 200) {
					this.weatherData = JSON.parse(xhr.responseText)
				}
			}
			xhr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?id=703448&units=metric&appid=d23141099f269b69643175e5ed4499b3')
			xhr.send()
		}
	},
	computed: {
		defaultTemp () {
			if (this.weatherData.main === undefined) {
				return 0
			} else {
				return Math.round(this.weatherData.main.temp)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.weather {
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 5px auto;
	padding: 0 10px;
	color: rgba(255,255,255, .7);
}
.weather__icon {
	opacity: .7;
}
.weather__data-wrap {
	text-align: center;
	margin-left: 15px;
}
.weather__city {
	font-size: 1.5rem;
}
.weather__temp {
	position: relative;
	font-size: 1.6rem;

	&::after {
		content: '';
		position: absolute;
		top: 8px;
		right: -2px;
		width: 7px;
		height: 7px;
		border-radius: 50%;
		border: 1.5px solid rgba(255,255,255, .75);
	}
}
</style>
