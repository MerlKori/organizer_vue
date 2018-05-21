<template>
<div
	:class="{'task-item--active': isActive}"
	class="task-item">
	<div class="task-item__head">
		<h3
			@click="toggleShowDesc()"
			class="task-item__title">{{recordingData.title}}</h3>
		<div
			:style="{background: recordingData.priority.prColor}"
			class="task-item__priority"></div>
		<div class="task-item__menu">
			<button
				@click="showEditRec()"
				class="task-item__head-btn task-item__head-btn--edit"><img src="../../../assets/images/edit.png" alt="edit"></button>
			<button
					@click="deleteRecord(recordingData._id)"
					class="task-item__head-btn task-item__head-btn--remove"><img src="../../../assets/images/delete.png" alt="delete"></button>
			<button
				@click="toggleVisMenu()"
				:class="{'btn--active': menuVisible}"
				class="task-item__menu-btn">
					<span class="btn-line1"></span>
					<span class="btn-line2"></span>
					<span class="btn-line3"></span>
			</button>
		</div>
	</div>
	<transition name="desc-slide">
		<div
		v-show="showDescription"
		class="task-item__description">{{recordingData.desc}}</div>
	</transition>
	<!-- EDIT REC -->
	<edit-rec :editData="recordingData" />
</div>
</template>

<script>
import EditRec from '@/components/organizer/events-window/EditRec'
import {mapGetters, mapActions, mapMutations} from 'vuex'
export default {
	name: 'TaskItem',
	components: {EditRec},
	props: {
		recordingData: {
			type: Object
		}
	},
	data () {
		return {
			showDescription: false,
			menuVisible: false
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
		},
		toggleVisMenu () {
			this.menuVisible = !this.menuVisible
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
.task-item {
	position: relative;
}
.task-item--active {
	.task-item__head {
		border-bottom: 1px solid $active-color;
	}
	.task-item__title {
		color: #fff;
	}
	.task-item__description {
		border: 1px solid $active-color;
		border-top: none;
	}
}
.task-item__head {
	display: flex;
	border-bottom: 1px solid $bd-color;
	transition: border-bottom $transition-time, background-color .25s;

	&:hover {
		background-color: rgba(38,166,154, .1);
	}
}
.task-item__title {
	font-size: 1rem;
	padding: 5px 10px;
	color: $text-color;
	flex-grow: 1;
	cursor: pointer;
}
.task-item__head-btn {
	width: 30px;
	height: 30px;
	text-align: center;
	transition: filter .3s;
	display: none;
	cursor: pointer;

	&:hover {
		filter: brightness(130%);
	}

	img {
		vertical-align: middle;
	}
}
// .task-item__priority {
// 	width: 30px;
// 	height: 30px;
// }
// item menu
.task-item__menu {
	display: flex;
	align-items: center;
}
.task-item__menu-btn {
	position: relative;
	width: 30px;
	height: 30px;
	overflow: hidden;
	background-color: transparent;
	transition: .5s ease-in-out;
	cursor: pointer;

	span {
		position: absolute;
		left: 0;
		display: block;
		width: 100%;
		height: 3px;
		background: rgba(38,166,154, .8);
		border-radius: 10px;
		transition: all 0.35s;
		pointer-events: none;
	}
	.btn-line1 {
		top: 4px;
	}
	.btn-line2 {
		top: 14px;
	}
	.btn-line3 {
		top: 24px;
	}
}
.task-item__menu-btn.btn--active {
	span.btn-line1 {
		top: 14px;
		transform: rotate(45deg);
	}
	span.btn-line2 {
		left: -100%;
	}
	span.btn-line3 {
		top: 14px;
		transform: rotate(-45deg);
	}
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
