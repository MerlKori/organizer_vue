<template>
<div class="recording">
	<div class="recording__head">
		<h3
			@click="toggleShowDesc()"
			class="recording__title">{{recordingData.title}}</h3>
		<button class="recording__head-btn edit"><img src="../../../assets/images/edit.png" alt="edit"></button>
		<button
				@click="deleteRecord(recordingData._id)"
				class="recording__head-btn recording__remove"><img src="../../../assets/images/delete.png" alt="delete"></button>
	</div>
	<transition name="desc">
		<div
		v-show="showDescription"
		class="recording__description">{{recordingData.desc}}</div>
	</transition>
</div>
</template>

<script>
// import {eventBus} from '../../../eventBus.js'
import {mapGetters, mapActions} from 'vuex'
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
		...mapActions('winRecords', ['doFilter']),
		toggleShowDesc () {
			this.showDescription = !this.showDescription
		},
		deleteRecord (id) {
			const xhr = new XMLHttpRequest()
			let formData = JSON.stringify({
				_id: id
			})
			xhr.onreadystatechange = () => {
				if (xhr.status === 200 && xhr.readyState === 4) {
					this.doFilter({
						answerArr: JSON.parse(xhr.responseText),
						selectData: this.isSelectDate}
					)
				}
			}
			xhr.open('POST', 'http://localhost:9595/rem-rec')
			xhr.send(formData)
		}
	},
	computed: {
		...mapGetters('calendar', ['isSelectDate'])
	}
}
</script>

<style lang="scss" scoped>
// variables
$bd-color: #0d47a1;

.recording {
	position: relative;
	margin-bottom: 5px;
}
.recording__head {
	display: flex;
	border: 1px solid $bd-color;
	padding: 3px 10px;
}
.recording__title {
	font-size: 1.25rem;
	color: #0d47a1;
	flex-grow: 1;
	cursor: pointer;
}
.recording__head-btn {
	background-color: #fff;
	margin: 0 5px;
	width: 20px;
	height: 20px;
	cursor: pointer;
}
.recording__description {
	padding: 10px;
	border: 1px solid $bd-color;
	transform-origin: top;
}
// animation
// .desc-enter-active,
// .desc-leave-active {
// 	transition: all .3s ease;
// }

// .desc-enter,
// .slide-leave-to {
// 	transform: scaleY(0);
// }
</style>
