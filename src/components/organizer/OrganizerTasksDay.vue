<template>
<div class="task-window">
	<div class="task-window__title">Tasks for <span>{{isSelectDate}}</span></div>
	<!-- TaskItem -->
	<task-item
		v-for="(el, index) in eventsDataList"
		:key="index"
		:recordingData="el"/>
	<div class="add-task">
		<div class="add-task__input-wrap ">
			<input
				v-model="newTaskTitle"
				type="text"
				name="task-title"
				id="new-task-title"
				class="add-task__title"
			>
			<label
				:class="{'add-task__title--label-focus': titleLabelVisible}"
				for="new-task-title">record title</label>
		</div>
		<div class="add-task__input-wrap">
			<textarea
				v-model="newTaskDesc"
				name="task-desc"
				id="new-task-desc"
				class="add-task__decs"
			></textarea>
			<label
				:class="{'add-task__decs--label-focus': descLabelVisible}"
				for="new-taskc-desc">Description</label>
		</div>
		<!-- PrioritySelect -->
		<priority-select />
		<button
			@click="sendRequest()"
			class="add-task__btn">add record</button>
	</div>
</div>
</template>

<script>
import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'
import TaskItem from '@/components/organizer/task-win/TaskItem.vue'
import PrioritySelect from '@/components/organizer/task-win/PrioritySelect'
export default {
	name: 'OrganizerTasksDay',
	components: {TaskItem, PrioritySelect},
	props: {
		dataCalendar: {
			type: Object
		}
	},
	data () {
		return {
			newTaskTitle: '',
			newTaskDesc: ''
		}
	},
	methods: {
		...mapActions('winRecords', ['doFilter']),
		...mapMutations('winRecords', ['getAllRecords']),
		sendRequest () {
			const xhr = new XMLHttpRequest()
			let formData = JSON.stringify({
				date: this.isSelectDate,
				title: this.newTaskTitle,
				desc: this.newTaskDesc,
				priority: {
					prVal: this.selectVal,
					prColor: this.colorTitle
				}
			})
			xhr.onreadystatechange = () => {
				if (xhr.readyState === 4) {
					this.doFilter({
						answerArr: JSON.parse(xhr.responseText),
						selectData: this.isSelectDate}
					)
					this.getAllRecords(JSON.parse(xhr.responseText))
				}
			}
			xhr.open('POST', 'http://localhost:9595/created')
			xhr.send(formData)
			this.newTaskTitle = ''
			this.newTaskDesc = ''
		}
	},
	computed: {
		...mapState('winRecords', ['eventsDataList']),
		...mapState('Select', ['selectVal', 'colorTitle']),
		...mapGetters('calendar', ['isSelectDate']),
		descLabelVisible () {
			if (this.newTaskDesc === '') {
				return false
			} else {
				return true
			}
		},
		titleLabelVisible () {
			if (this.newTaskTitle === '') {
				return false
			} else {
				return true
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.task-window {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	padding: 15px;
	background-color: rgba(255,255,255,0.1);
}
.task-window__title {
	font-size: 2rem;
	padding: 5px 20px;
	margin: 10px 0 60px;
	border-bottom: 1px solid #000;
}

// ============================================= add events =========================================================
$focus-color: #26a69a;
$deactive-color: rgba(255,255,255, .65);
$focus-transition-timing: .3s;
.add-task {
	margin: auto 30px 30px;
	padding-top: 20px;
	width: 70%;
}
.add-task__title,
.add-task__decs {
	display: block;
	width: 100%;
	margin-bottom: 10px;
	padding: 5px 10px;
	background-color: rgba(255,255,255, 0);
	font-size: .9rem;
	color: rgba(255,255,255, .9);
	transition: border-bottom $focus-transition-timing, box-shadow $focus-transition-timing;
	cursor: pointer;

	&:focus {
		background-color: rgba(0,0,0,0.2);
	}
}
.add-task__input-wrap {
	position: relative;
	label {
		position: absolute;
		left: 10px;
		font-size: .9rem;
		text-transform: capitalize;
		color: $deactive-color;
		z-index: -1;
		cursor: pointer;
	}
}
.add-task__title  {
	border: none;
	border-bottom: 1px solid $deactive-color;

	& + label {
		top: 15%;
		transition: top $focus-transition-timing, font-size $focus-transition-timing, color $focus-transition-timing;
	}

	&:focus {
		border-bottom: 1px solid $focus-color;
		box-shadow: 0 1px 0 0 $focus-color;

		& + label {
			top: - 60%;
			font-size: .75rem;
			color: $focus-color;
		}
	}
	& + .add-task__title--label-focus {
			top: - 60%;
			font-size: .75rem;
			color: $focus-color;
		}
}
.add-task__decs {
	height: 80px;
	overflow-y: auto;
	border: 1px solid rgba(0,0,0, 0);
	border-top-color: $deactive-color;

	& + label {
		top: 5%;
		transition: top .5s, font-size $focus-transition-timing, opacity .4s, height .4s;
	}

	&:focus {
		border: 1px solid $focus-color;
		height: 150px;

		& + label {
			top: 105%;
			font-size: .7rem;
			opacity: 0;
		}
	}
	& + .add-task__decs--label-focus {
			top: 105%;
			font-size: .7rem;
			opacity: 0;
	}
}
.add-task__btn {
	display: block;
	width: 100%;
	max-width: 150px;
	height: 40px;
	border-radius: 5px;
	font-size: 1.2rem;
	color: #fff;
	text-transform: capitalize;
	background-color: rgba(255,255,255,0.1);
	border: 1px solid #fff;
	transition: background-color $focus-transition-timing;
	cursor: pointer;

	&:hover {
		background-color: $focus-color;
	}
}
</style>
