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
	bottom: 10px;
	left: 5px;
	display: flex;
	align-items: center;
	justify-content: space-around;
	max-width: 60%;

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
	width: $size-label;
	height: $size-label;
	border-radius: 50%;
	margin: 0 5px;
	opacity: 0;
}
.label--low {
		background-color: #42A645;
}
.label--medium {
		background-color: #F9C120;
}
.label--highest {
		background-color: #D23949;
}
</style>
