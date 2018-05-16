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
}
.labels {
	width: $size-label;
	height: $size-label;
	border-radius: 50%;
	margin: 0 5px;
}
.label--low {
		background-color: #00e676;
}
.label--medium {
		background-color: #ffa000;
}
.label--highest {
		background-color: #dd2c00;
}
</style>
