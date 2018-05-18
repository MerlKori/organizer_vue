<template>
	<div class="labels__wrap">
		<span class="labels label--low"></span>
		<span class="labels label--medium"></span>
		<span class="labels label--highest"></span>
	</div>
</template>

<script>
export default {
	name: 'RecordLabel',
	data () {
		return {}
	}
}
</script>

<style lang="scss" scoped>
$size-label: 22px;
.labels__wrap {
	position: absolute;
	bottom: 0px;
	left: 0px;
	width: 100%;
	height: 30px;
	align-items: center;

	&.rec--low .label--low {
		opacity: 1;
	}
	&.rec--med .label--medium {
		opacity: 1;
	}
	&.rec--hig .label--highest{
		opacity: 1;
	}
}
.labels {
	opacity: 0;
	position: absolute;
	width: 20px;
	transform: rotate(-45deg);
}
.label--low {
	bottom: -40%;
	left: -2%;
	height: 50px;
	background-color: #42A645;
}
.label--medium {
	bottom: -70%;
	left: 2%;
	height: 100px;
	background-color: #F9C120;
}
.label--highest {
	bottom: -100%;
	left: 5%;
	height: 160px;
	background-color: #D23949;
}
</style>
