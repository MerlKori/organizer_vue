<template>
<div
	:class="{'task-item--active': isActive}"
	class="task-item">
	<div
		:style="{borderBottom: `2px solid ${recordingData.priority.prColor}`}"
		class="task-item__head">
		<h3
			@click="toggleShowDesc()"
			class="task-item__title">{{recordingData.title}}</h3>
		<div
			:style="{background: recordingData.priority.prColor}"
			class="task-item__priority"></div>
		<button
			@click="toggleEditWin()"
			class="task-item__head-btn task-item__head-btn--edit"><img src="../../../assets/images/edit.png" alt="edit"></button>
		<button
				@click="deleteTask(recordingData._id)"
				class="task-item__head-btn task-item__head-btn--remove"><img src="../../../assets/images/delete.png" alt="delete"></button>
	</div>
	<transition name="slideUp">
	<div
		v-show="showDescription"
		class="task-item__description"
	>{{recordingData.desc}}</div>
	</transition>
	<!-- EditTask -->
	<edit-task
		@closeUp="toggleEditWin()"
		:visibility="showEditWin"
		:editData="recordingData" />
</div>
</template>

<script>
import axios from 'axios'
import EditTask from '@/components/organizer/task-win/EditTask'
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
export default {
	name: 'TaskItem',
	components: {EditTask},
	props: {
		recordingData: {
			type: Object
		}
	},
	data () {
		return {
			showDescription: false,
			showEditWin: false
		}
	},
	watch: {
		flagTaskItem: function () {
			if (this.showDescription === true) {
				this.toggleShowDesc()
			}
		}
	},
	methods: {
		...mapActions('winRecords', ['doFilter']),
		...mapMutations('winRecords', ['getAllRecords']),
		...mapMutations('Select', ['setDefaultEditVal']),
		toggleShowDesc () {
			this.showDescription = !this.showDescription
		},
		toggleEditWin () {
			this.showEditWin = !this.showEditWin
		},
		deleteTask (id) {
			console.log(id)
			console.log(this.accessKey)
			axios.post(`${this.urlServer}remove`, {
				_id: id,
				key: this.accessKey
			})
				.then((res) => {
					this.doFilter({
						answerArr: res.data,
						selectData: this.isSelectDate}
					)
					this.getAllRecords(res.data)
				})
				.catch(() => console.log('err'))
		}
	},
	computed: {
		...mapState(['urlServer']),
		...mapState('accessPoint', ['accessKey']),
		...mapGetters('calendar', ['isSelectDate']),
		...mapState('winRecords', ['flagTaskItem']),
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
.task-item {
	position: relative;
	max-width: 960px;
}
.task-item--active {
	.task-item__head {
		border-bottom: 1px solid $active-color;
	}
	.task-item__title {
		color: rgba(38,166,154, .8);
	}
	.task-item__description {
		background-color: rgba(38,166,154, .5);
		color: #fff;
		padding: 5px;
		border: 1px solid $active-color;
		border-top: none;
	}
}
.task-item__head {
	display: flex;
	margin-top: 5px;
	transition: border-bottom $transition-time, background-color .25s;

	&:hover {
		background-color: rgba(38,166,154, .1);
	}
}
.task-item__title {
	font-size: 1rem;
	padding: 5px 10px;
	color: rgba(0,0,0, .6);
	font-weight: 700;
	flex-grow: 1;
	cursor: pointer;
}

.task-item__head-btn {
	width: 30px;
	height: 30px;
	line-height: 37px;
	text-align: center;
	border-radius: 3px;
	margin: 1px;
	transition: all .3s;
	cursor: pointer;

	&:hover {
		filter: brightness(130%);
	}
}
.task-item__head-btn--remove {
	background-color: rgba(243, 7, 11, 0.6);
}
.task-item__head-btn--edit {
	background-color: rgba(44,192,39, 0.7);
}
</style>
