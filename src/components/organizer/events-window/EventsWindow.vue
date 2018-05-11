<template>
<div>
	<div class="events-window">
		<div class="events-window__header">
			<h2 class="title"></h2>
			<div class="window__close-btn"></div>
		</div>
		<!-- EventRecording -->
		<event-recording
						v-for="(el, index) in eventsDataList"
						:key="index"
						:recordingData="el"/>
		<div class="add-event">
			<input
				type="text"
				name="event-title"
				class="add-event__title"
			>
			<textarea
					name="event-desc"
					class="add-event__decs"
			></textarea>
			<button class="add-event__btn">add</button>
		</div>
	</div>
	<div class="overlay"></div>
</div>
</template>

<script>
import {eventsList} from './../DataBase.js'
import EventRecording from '@/components/organizer/events-window/EventRecording'
export default {
	name: 'EventsWindow',
	components: {EventRecording},
	data () {
		return {
			eventsDataList: eventsList
		}
	}
}
</script>

<style lang="scss" scoped>
.events-window {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	padding: 15px;
	width: 100%;
	max-width: 1000px;
	min-height: 40vw;
	max-height: 100vh;
	overflow-y: auto;
	z-index: 20;
	background-color: #fff;
}
.add-event {
	margin: 30px auto;
}
.add-event__decs,
.add-event__title {
	display: block;
	width: 100%;
	margin: 5px 0;
	padding: 10px;
	border: 1px solid #000;
}
.add-event__decs {
	min-height: 100px;
}
.add-event__btn {
	display: block;
	width: 100%;
	max-width: 100px;
	height: 50px;
	border-radius: 5px;
	font-size: 20px;
	font-weight: 700;
	color: #fff;
	text-transform: uppercase;
	background-color: aqua;
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
