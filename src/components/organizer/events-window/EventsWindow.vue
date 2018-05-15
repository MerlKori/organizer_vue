<template>
<div v-show="this.visible">
	<div class="events-window">
		<div class="events-window__header">
			<h2 class="events-window__header-title">
				<span ><b>Selected date :</b></span>
				<span>{{isSelectDate}}</span>
			</h2>
			<button
				@click="toggleVisible()"
				class="window__close-btn" ><img src="../../../assets/images/close.png" alt="close"></button>
		</div>
		<!-- EventRecording -->
		<event-recording
						v-for="(el, index) in eventsDataList"
						:key="index"
						:recordingData="el"/>
		<div class="add-event">
			<input
				v-model="newEvTitle"
				type="text"
				name="event-title"
				class="add-event__title"
				placeholder="Event title"
			>
			<textarea
				v-model="newEvDesc"
				name="event-desc"
				class="add-event__decs"
				placeholder="Event description"
			></textarea>
			<button
				@click="sendRequest()"
				class="add-event__btn">add</button>
		</div>
	</div>
	<div class="overlay"></div>
</div>
</template>

<script>
import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'
import EventRecording from '@/components/organizer/events-window/EventRecording'
export default {
	name: 'EventsWindow',
	components: {EventRecording},
	props: {
		dataCalendar: {
			type: Object
		}
	},
	data () {
		return {
			newEvTitle: '',
			newEvDesc: ''
		}
	},
	methods: {
		...mapActions('winRecords', ['doFilter']),
		...mapMutations('winRecords', ['toggleVisible']),
		sendRequest () {
			const xhr = new XMLHttpRequest()
			let formData = JSON.stringify({
				date: this.isSelectDate,
				title: this.newEvTitle,
				desc: this.newEvDesc
			})
			xhr.onreadystatechange = () => {
				if (xhr.readyState === 4) {
					this.doFilter({
						answerArr: JSON.parse(xhr.responseText),
						selectData: this.isSelectDate}
					)
				}
			}
			xhr.open('POST', 'http://localhost:9595/created')
			xhr.send(formData)
			this.newEvTitle = ''
			this.newEvDesc = ''
		}
	},
	computed: {
		...mapState('winRecords', ['visible', 'eventsDataList']),
		...mapGetters('calendar', ['isSelectDate'])
	}
}
</script>

<style lang="scss" scoped>
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
// header
.events-window__header {
	position: relative;
	border-bottom: 1px solid #122855;
	padding: 0 0 10px;
	margin-bottom: 20px;
}
.events-window__header-title {
	font-size: 1.25rem;
	color: #122855;
}
.window__close-btn {
	position: absolute;
	top: -2px;
	right: 10px;
	height: 25px;
	width: 25px;
	background-color: transparent;
	transform-origin: center;
	cursor: pointer;
}
// add events
.add-event {
	margin: auto 30px 30px;
	width: 70%;
}
.add-event__decs,
.add-event__title {
	display: block;
	width: 100%;
	margin: 5px 0;
	padding: 5px 10px;
	border: 1px solid #122855;
	border-radius: 5px;
	transition: box-shadow .3s;

	&:focus {
		box-shadow: 0 0 10px #0d47a1;
	}
}
.add-event__decs {
	min-height: 100px;
}
.add-event__btn {
	display: block;
	width: 100%;
	max-width: 100px;
	height: 40px;
	border-radius: 5px;
	font-size: 1.25rem;
	font-weight: 700;
	color: #fff;
	text-transform: uppercase;
	background-color: #0d47a1;
	cursor: pointer;
}
// ================= overlay ================
.overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: rgba(0,0,0, .5);
	z-index: 15;
}
</style>
