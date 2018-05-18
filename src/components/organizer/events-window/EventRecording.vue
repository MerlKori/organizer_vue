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
				@click="toogleVisEdit()"
				class="recording__head-btn recording__head-btn--edit"><img src="../../../assets/images/edit.png" alt="edit"></button>
		<button
				@click="deleteRecord(recordingData._id)"
				class="recording__head-btn recording__head-btn--remove"><img src="../../../assets/images/delete.png" alt="delete"></button>
	</div>
	<transition name="desc">
		<div
		v-show="showDescription"
		class="recording__description">{{recordingData.desc}}</div>
	</transition>
	<!-- EDIT REC -->
		<div
			v-show="editWinVisible"
			class="edit">
			<input
					v-model="editTitleVAl"
					type="text" class="edit__title" name="edit-title">
			<textarea
					v-model="editDescVAl"
					name="edit-desc" class="edit__desc"></textarea>
			<div class="edit__btns-wrap">
				<button
					@click="editRec(recordingData._id)"
					class="edit__btns send-edit">Edit</button>
				<button
						@click="toogleVisEdit()"
						class="edit__btns cancel-edit">Cancel</button>
			</div>
		</div>
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
			showDescription: false,
			editWinVisible: false,
			editTitleVAl: this.recordingData.title,
			editDescVAl: this.recordingData.desc
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
		},
		editRec (id) {
			const xhr = new XMLHttpRequest()
			let formData = JSON.stringify([
				{
					_id: id
				},
				{
					date: this.isSelectDate,
					title: this.editTitleVAl,
					desc: this.editDescVAl
				}
			])
			xhr.onreadystatechange = () => {
				if (xhr.status === 200 && xhr.readyState === 4) {
					this.doFilter({
						answerArr: JSON.parse(xhr.responseText),
						selectData: this.isSelectDate}
					)
					this.toogleVisEdit()
				}
			}
			xhr.open('POST', 'http://localhost:9595/update')
			xhr.send(formData)
		},
		toogleVisEdit () {
			this.editWinVisible = !this.editWinVisible
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
	padding: 10px;
	border: 1px solid $bd-color;
	color: $text-color;
	border-top: none;
	transform-origin: top;
}

// ============================================= EDIT REC ===============================================
.edit {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100%;
	background-color: #fff;
	padding: 20px 15px;
	z-index: 30;
}

.edit__title,
.edit__desc {
	display: block;
	width: 100%;
	font-size: 1rem;
	color: #333;
	padding: 5px;
	margin-top: 5px;
	transition: all .25s;
}

.edit__title {
	border: none;
	border-bottom: 1px solid $bd-color;
	&:focus {
		color: #26a69a;
		border-bottom: 1px solid #26a69a;
	}
}

.edit__desc {
	border: 1px solid $bd-color;
	height: 150px;
	overflow-y: auto;
	&:focus {
		color: #26a69a;
		border: 1px solid #26a69a;
	}
}

.edit__btns-wrap {
	text-align: right;
}

.edit__btns  {
	display: inline-block;
	width: 100%;
	max-width: 80px;
	margin: 15px 10px;
	height: 30px;
	border-radius: 5px;
	font-size: 1rem;
	text-transform: capitalize;
	background-color: #fff;
	transition: all .3s;
	cursor: pointer;
}
.send-edit {
	color: #26a69a;
	border: 1px solid #26a69a;

	&:hover {
		color: #fff;
		background-color: #26a69a;
	}
}
.cancel-edit {
	color: #E56F75;
	border: 1px solid #E56F75;

	&:hover {
		color: #fff;
		background-color: #E56F75;
	}
}

</style>
