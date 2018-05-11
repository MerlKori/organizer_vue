<template>
<div class="recording">
	<div class="recording__head">
		<h3
			@click="toggleShowDesc()"
			class="recording__title">{{recordingData.title}}</h3>
		<button class="recording__head-btn edit"><img src="../../../assets/images/edit-icon.png" alt="edit"></button>
		<button class="recording__head-btn recording__remove"><img src="../../../assets/images/remove-icon.png" alt="remove"></button>
	</div>
	<div
		v-show="showDescription"
		class="recording__description">{{recordingData.description}}</div>
</div>
</template>

<script>
export default {
	name: 'EventRecording',
	props: {
		recordingData: {
			type: Object
		}
	},
	data () {
		return {
			showDescription: false
		}
	},
	methods: {
		toggleShowDesc () {
			this.showDescription = !this.showDescription
		}
	}
}
</script>

<style lang="scss" scoped>
// variables
$bd-color: #000;

.recording {
	position: relative;
}
.recording__head {
	display: flex;
	border: 1px solid $bd-color;
	padding: 5px 10px;
}
.recording__title {
	flex-grow: 1;
	cursor: pointer;
}
.recording__head-btn {
	background-color: #fff;
	margin: 0 5px;
	cursor: pointer;
}
.recording__description {
	padding: 10px;
	border: 1px solid $bd-color
}
</style>
