<template>
<div
	:class="{'recording--active': isActive}"
	class="recording">
	<div class="recording__head">
		<h3
			@click="toggleShowDesc()"
			class="recording__title">{{recordingData.title}}</h3>
		<div
			:style="{background: recordingData.priority.prColor}"
			class="recording__priority"></div>
		<button
				@click="showEditRec()"
				class="recording__head-btn recording__head-btn--edit"><img src="../../../assets/images/edit.png" alt="edit"></button>
		<button
				@click="deleteRecord(recordingData._id)"
				class="recording__head-btn recording__head-btn--remove"><img src="../../../assets/images/delete.png" alt="delete"></button>
	</div>
	<transition name="desc-slide">
		<div
		v-show="showDescription"
		class="recording__description">{{recordingData.desc}}</div>
	</transition>
	<!-- EDIT REC -->
	<edit-rec :editData="recordingData" />
</div>
</template>

<script>
import EditRec from '@/components/organizer/events-window/EditRec'
import {mapGetters, mapActions, mapMutations} from 'vuex'
export default {
	name: 'EventRecording',
	components: {EditRec},
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
		...mapMutations('winRecords', ['toggleVisEdit', 'getAllRecords']),
		...mapMutations('Select', ['setDefaultEditVal']),
		toggleShowDesc () {
			this.showDescription = !this.showDescription
		},
		showEditRec () {
			this.setDefaultEditVal({
				value: this.recordingData.priority.prVal,
				color: this.recordingData.priority.prColor
			})
			this.toggleVisEdit()
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
					this.getAllRecords(JSON.parse(xhr.responseText))
				}
			}
			xhr.open('POST', 'http://localhost:9595/rem-rec')
			xhr.send(formData)
		}
	},
	computed: {
		...mapGetters('calendar', ['isSelectDate']),
		isActive () {
			if (this.showDescription === true) {
				return true
			} else {
				return false
			}
		}
	}
}
</script>

<style lang="scss" scoped>
// variables
$bd-color: #9e9e9e;
$text-color: rgba(0,0,0, .8);
$active-color: #26a69a;
$transition-time: .3s;
.recording {
	position: relative;
}
.recording--active {
	.recording__head {
		border-bottom: 1px solid $active-color;
	}
	.recording__title {
		color: $active-color;
	}
	.recording__description {
		border: 1px solid $active-color;
		border-top: none;
	}
}
.recording__head {
	display: flex;
	border-bottom: 1px solid $bd-color;
	transition: border-bottom $transition-time, background-color .25s;

	&:hover {
		background-color: rgba(38,166,154, .1);
	}
}
.recording__title {
	font-size: 1rem;
	padding: 5px 10px;
	color: $text-color;
	flex-grow: 1;
	cursor: pointer;
}
.recording__head-btn {
	width: 30px;
	height: 30px;
	text-align: center;
	transition: filter .3s;
	cursor: pointer;

	&:hover {
		filter: brightness(130%);
	}

	img {
		vertical-align: middle;
	}
}
.recording__priority {
	width: 30px;
	height: 30px;
}
.recording__head-btn--edit {
	background-color: #26a69a;
}
.recording__head-btn--remove {
	background-color: #E56F75;
}
.recording__description {
	max-height: 250px;
	overflow-y: auto;
	padding: 10px;
	border: 1px solid $bd-color;
	color: $text-color;
	border-top: none;
	transform-origin: top;
}
// animation description
.desc-slide-enter-active,
.desc-slide-leave-active {
  transition: all .25s linear;
}
.desc-slide-enter, .desc-slide-leave-to {
	max-height: 0;
}
</style>
