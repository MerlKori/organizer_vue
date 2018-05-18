<template>
<transition name="recWin">
<div v-show="this.visible">
	<div
		class="events-window">
		<div class="events-window__header">
			<h2 class="events-window__header-title">
				<span ><b>Selected date :</b></span>
				<span>{{isSelectDate}}</span>
			</h2>
			<button
				@click="toggleVisible()"
				class="window__close-btn" ></button>
		</div>
		<!-- EventRecording -->
		<event-recording
						v-for="(el, index) in eventsDataList"
						:key="index"
						:recordingData="el"/>
		<div class="add-rec">
			<div class="add-rec__input-wrap ">
				<input
					v-model="newRecTitle"
					type="text"
					name="rec-title"
					id="new-rec-title"
					class="add-rec__title"
				>
				<label
					:class="{'add-rec__title--label-focus': titleLabelVisible}"
					for="new-rec-title">record title</label>
			</div>
			<div class="add-rec__input-wrap">
				<textarea
					v-model="newRecDesc"
					name="rec-desc"
					id="new-rec-desc"
					class="add-rec__decs"
				></textarea>
				<label
					:class="{'add-rec__decs--label-focus': descLabelVisible}"
					for="new-rec-desc">Description</label>
			</div>
			<!-- PrioritySelect -->
			<priority-select />
			<button
				@click="sendRequest()"
				class="add-rec__btn">add record</button>
		</div>
	</div>
	<div class="overlay"></div>
</div>
</transition>
</template>

<script>
import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'
import EventRecording from '@/components/organizer/events-window/EventRecording'
import PrioritySelect from '@/components/organizer/events-window/PrioritySelect'
export default {
	name: 'EventsWindow',
	components: {EventRecording, PrioritySelect},
	props: {
		dataCalendar: {
			type: Object
		}
	},
	data () {
		return {
			newRecTitle: '',
			newRecDesc: ''
		}
	},
	methods: {
		...mapActions('winRecords', ['doFilter']),
		...mapMutations('winRecords', ['toggleVisible', 'getAllRecords']),
		sendRequest () {
			const xhr = new XMLHttpRequest()
			let formData = JSON.stringify({
				date: this.isSelectDate,
				title: this.newRecTitle,
				desc: this.newRecDesc,
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
			this.newRecTitle = ''
			this.newRecDesc = ''
		}
	},
	computed: {
		...mapState('winRecords', ['visible', 'eventsDataList']),
		...mapState('Select', ['selectVal', 'colorTitle']),
		...mapGetters('calendar', ['isSelectDate']),
		descLabelVisible () {
			if (this.newRecDesc === '') {
				return false
			} else {
				return true
			}
		},
		titleLabelVisible () {
			if (this.newRecTitle === '') {
				return false
			} else {
				return true
			}
		}
	}
}
</script>

<style lang="scss" scoped>
$window-text-color: rgba(0,0,0,0.87);
.events-window {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	flex-direction: column;
	padding: 15px;
	width: 100%;
	max-width: 1000px;
	min-height: 40vw;
	max-height: 100vh;
	overflow-y: auto;
	border-radius: 5px;
	z-index: 20;
	background-color: #fff;
}
.events-window--hiden {
	opacity: 0;
}
// =============================================== header ====================================================
.events-window__header {
	position: relative;
	padding: 0 0 10px;
	margin-bottom: 20px;
}
.events-window__header-title {
	font-size: 1.1rem;
	color: $window-text-color;
}
// btn close variables
$btn-color: #E56F75;
$bd-width: 1px;
$anim-timing: .25s;
.window__close-btn {
	position: absolute;
	top: -2px;
	right: 0px;
	height: 25px;
	width: 25px;
	background-color: rgba(229,111,117, 0);
	border: $bd-width solid $btn-color;
	border-radius: 5px;
	cursor: pointer;
	transition: $anim-timing;

	&:hover {
		background-color: rgba(229,111,117, .6);

		&::before,
		&::after {
			background-color: #fff;
		}
	}

	&::before,
	&::after {
		position: absolute;
		top: 12px;
		content: '';
		width: 80%;
		height: $bd-width;
		background-color: $btn-color;
		transition: $anim-timing;
	}
	&::before {
		transform: rotate(-45deg);
		left: 3px;
	}
	&::after {
		transform: rotate(45deg);
		right: 2px;
	}
}
// ============================================= add events =========================================================
$focus-color: #26a69a;
$focus-transition-timing: .3s;
.add-rec {
	margin: auto 30px 30px;
	width: 70%;
}
.add-rec__title,
.add-rec__decs {
	display: block;
	width: 100%;
	margin-bottom: 10px;
	padding: 5px 10px;
	font-size: .9rem;
	color: $window-text-color;
	transition: border-bottom $focus-transition-timing, box-shadow $focus-transition-timing;
	cursor: pointer;
}
.add-rec__input-wrap {
	position: relative;
	label {
		position: absolute;
		left: 10px;
		font-size: .9rem;
		text-transform: capitalize;
		color: #9e9e9e;
		cursor: pointer;
	}
}
.add-rec__title  {
	border: none;
	border-bottom: 1px solid #9e9e9e;

	& + label {
		top: 15%;
		transition: top $focus-transition-timing, font-size $focus-transition-timing, color $focus-transition-timing;
	}

	&:focus {
		border-bottom: 1px solid $focus-color;
		box-shadow: 0 1px 0 0 $focus-color;

		& + label {
			top: - 45%;
			font-size: .7rem;
			color: $focus-color;
		}
	}
	& + .add-rec__title--label-focus {
			top: - 45%;
			font-size: .7rem;
			color: $focus-color;
		}
}
.add-rec__decs {
	height: 80px;
	overflow-y: auto;
	border: 1px solid rgba(0,0,0, 0);
	border-top-color: #9e9e9e;

	& + label {
		top: 5%;
		transition: top $focus-transition-timing, font-size $focus-transition-timing, opacity $focus-transition-timing, height $focus-transition-timing;
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
	& + .add-rec__decs--label-focus {
			top: 105%;
			font-size: .7rem;
			opacity: 0;
	}
}

.add-rec__btn {
	display: block;
	width: 100%;
	max-width: 150px;
	height: 40px;
	border-radius: 5px;
	font-size: 1.2rem;
	color: $focus-color;
	text-transform: capitalize;
	background-color: #fff;
	border: 1px solid $focus-color;
	transition: background-color $focus-transition-timing, color $focus-transition-timing;
	cursor: pointer;

	&:hover {
		background-color: $focus-color;
		color: #fff;
	}
}
// ================= overlay ================
.overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: rgba(0,0,0, .8);
	z-index: 15;
}
// =============================== animations ============================================
.recWin-enter-active, .recWin-leave-active {
  transition:  opacity .5s;
}
.recWin-enter, .recWin-leave-to {
  opacity: 0;
}
</style>
