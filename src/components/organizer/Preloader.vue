<template>
<div class="transition-loader">
	<div class="transition-loader-inner">
		<label></label>
		<label></label>
		<label></label>
		<label></label>
		<label></label>
		<label></label>
	</div>
</div>
</template>

<script>
export default {
	namr: 'Preloader',
	date () {
		return {}
	}
}
</script>

<style lang="scss" scoped>
.transition-loader {
	position: fixed;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	// background-color: rgba(0,0,0, .6);
	z-index: 50;
}

.transition-loader-inner {
	transform: translate(-50%, -50%);
	top: 50%;
	left: 50%;
	position: absolute;
	width: calc(100% - 200px);
	padding: 0 100px;
	text-align: center;
	z-index: 51;

	label {
		font-size: 1em;
		padding: 1%;
		opacity: 0;
		margin: 0 10px;
		display: inline-block;
		background-color: rgba(255,255,255, .8);
		border-radius: 50%;
	}
}

$key-frames-ms: 1000ms, 900ms, 800ms, 700ms, 600ms, 500ms;

@each $current-ms in $key-frames-ms {
		$i: index($key-frames-ms, $current-ms);

		.transition-loader-inner label:nth-child(#{$i}) {
			animation: loader 3s $current-ms infinite ease-in-out;
		}
}

@keyframes loader {
	0% {
		opacity: 0;
		transform: translateX(-300px) scale(1);
	}
	33% {
		opacity: 1;
		transform: translateX(0px) scale(2);
	}
	66% {
		opacity: 1;
		transform: translateX(0px) scale(1);
	}
	100% {
		opacity: 0;
		transform: translateX(300px) scale(2);
	}
}
</style>
