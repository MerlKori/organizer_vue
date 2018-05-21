<template>
	<div class="labels__wrap">
		<span class="labels label--low"></span>
		<span class="labels label--medium"></span>
		<span class="labels label--highest"></span>
	</div>
</template>

<script>
export default {
	name: 'TaskLabels',
	data () {
		return {}
	}
}
</script>

<style lang="scss" scoped>
$size-label: 4px;
.labels__wrap {
	position: absolute;
	bottom: 0px;
	left: 0px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;

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
	margin: 1px 2px;
	opacity: 0;
}
.label--low {
	background-color: var(--green);
}
.label--medium {
	background-color: var(--yellow);
}
.label--highest {
	background-color: var(--red);
}
</style>
