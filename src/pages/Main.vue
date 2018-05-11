<template>
<div class="organizer__wrapp">
	<!-- OrganizerHeader -->
	<organizer-header
					@showPrewMonth="prewMonth()"
					@showNextMonth="nexMonth()"
					@showCurrentDate="goCurrentDate()"
					:dataTitle="calendarData"/>
	<main>
		<ul class="days-list">
			<li
				v-for="(title, index) in calendarData.daysTitle"
				:key="index"
			>
			{{title}}
			</li>
		</ul>
		<ul class="calendar" id="calendar">
			<transition-group name="list">
			<li
				v-for="(val, index) in calendarItem"
				:key="index"
				:class="{'cell--active': isActiveCell(index), 'cell--current-month': isCurrentMonth(index)}"
				@click="changeDay(index)"
			>
			{{val}}
			</li>
			</transition-group>
		</ul>
	</main>
	<!-- EventsWindow -->
	<events-window />
</div>
</template>

<script>
import OrganizerHeader from '@/components/organizer/OrganizerHeader'
import EventsWindow from '@/components/organizer/events-window/EventsWindow'
export default {
	name: 'Main',
	components: {OrganizerHeader, EventsWindow},
	data () {
		return {
			Date: new Date(),
			calendarData: {
				daysTitle: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
				monthTitle: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
				today: '',
				year: '',
				month: '',
				selectDay: '',
				selectMonth: '',
				selectYear: '',
				daysMonth: '',
				showDaysNextMonth: ''
			},
			maxItem: 42,
			calendarItem: [],
			activCell: ''
		}
	},
	created () {
		this.initCalendarData()
		this.createCalendar()
	},
	methods: {
		initCalendarData () {
			// today date
			this.calendarData.today = this.Date.getDate()
			this.calendarData.year = this.Date.getFullYear()
			this.calendarData.month = this.Date.getMonth()
			// select date default
			this.calendarData.selectDay = this.calendarData.today
			this.calendarData.selectMonth = this.calendarData.month
			this.calendarData.selectYear = this.calendarData.year
			this.activCell = (this.positionFirstDay(this.calendarData.selectYear, this.calendarData.selectMonth) - 1) + this.calendarData.selectDay
		},
		daysInMonth (year, month) {
			return 33 - new Date(year, month, 33).getDate()
		},
		positionFirstDay (year, month) {
			return new Date(year, month).getDay()
		},
		//  positionFirstDay - 1 количество дней до первого дня месяца
		visibleDaysPrewMonth () {
			return (this.positionFirstDay(this.calendarData.selectYear, this.calendarData.selectMonth) - 1)
		},
		//  this.calendarData.selectMonth - 1 предидущий месяц
		firstVisibleDaysPrewMonth () {
			return (this.daysInMonth(this.calendarData.selectYear, (this.calendarData.selectMonth - 1)) - this.visibleDaysPrewMonth())
		},
		sumDaysPrewCurrentMonth () {
			let daysPrew = this.visibleDaysPrewMonth()
			let daysCurren = this.daysInMonth(this.calendarData.selectYear, this.calendarData.selectMonth)
			return daysPrew + daysCurren
		},
		createCalendar () {
			let positionFirstDay = this.positionFirstDay(this.calendarData.selectYear, this.calendarData.selectMonth)
			let firstVisibleDaysPrewMonth = this.firstVisibleDaysPrewMonth()
			let countDaysCurrenMonth = 0
			let countDaysNextMonth = 0
			this.calendarItem = []

			for (let index = 0; index < this.maxItem; index++) {
				if (positionFirstDay > 0) {
					this.calendarItem.push(firstVisibleDaysPrewMonth)
					firstVisibleDaysPrewMonth++
					positionFirstDay--
				} else if (this.sumDaysPrewCurrentMonth() >= index) {
					countDaysCurrenMonth++
					this.calendarItem.push(countDaysCurrenMonth)
				} else {
					countDaysNextMonth++
					this.calendarItem.push(countDaysNextMonth)
				}
			}
			this.activCell = (this.positionFirstDay(this.calendarData.selectYear, this.calendarData.selectMonth) - 1) + this.calendarData.selectDay
		},
		nexMonth () {
			if (this.calendarData.selectMonth >= 11) {
				this.calendarData.selectMonth = 0
				this.calendarData.selectYear++
			} else {
				this.calendarData.selectMonth++
			}
			this.createCalendar()
		},
		prewMonth () {
			if (this.calendarData.selectMonth <= 0) {
				this.calendarData.selectMonth = 11
				this.calendarData.selectYear--
			} else {
				this.calendarData.selectMonth--
			}
			this.createCalendar()
		},
		changeDay (index) {
			this.calendarData.selectDay = this.calendarItem[index]
			if (index > this.sumDaysPrewCurrentMonth()) {
				this.calendarData.selectMonth++
				this.createCalendar()
			} else if (index < this.positionFirstDay(this.calendarData.selectYear, this.calendarData.selectMonth)) {
				this.calendarData.selectMonth--
				this.createCalendar()
			} else {
				this.activCell = index
			}
		},
		goCurrentDate () {
			this.calendarData.selectDay = this.calendarData.today
			this.calendarData.selectMonth = this.calendarData.month
			this.calendarData.selectYear = this.calendarData.year
			this.createCalendar()
		},
		isActiveCell (index) {
			if (index === this.activCell) {
				return true
			}
		},
		isCurrentMonth (index) {
			if (index > this.visibleDaysPrewMonth() && index <= this.sumDaysPrewCurrentMonth()) {
				return true
			}
		}
	}
}
</script>

<style lang="scss" scoped>
// ============= variaqbles ===========
$border-color: #333;

.wrapp {
	height: 100vh;
}
// ================= days-list ===============================
.days-list {
	display: flex;

	li {
		font-size: 1rem;
		text-align: center;
		width: calc(100% / 7);
		border: 1px solid $border-color;
	}
}
// ============ calendar ========
.calendar span {
	display: flex;
	flex-wrap: wrap;

	li {
		font-size: 1rem;
		width: calc(100% / 7);
		padding-bottom: 5%;
		border: 1px solid $border-color;
		transition: all .3s;
		cursor: pointer;
	}
	.cell--current-month.cell--active {
		background: tomato;
	}
	.cell--current-month {
		background-color: aquamarine;
	}
}
// =============== animation =====================
// .list-enter {
// 	transform: translateX(100px);
// 	opacity: 0;
// }
// .list-enter-active {
// 	transition: all .5s;
// }
// .list-leave-to {
// 	transform: translateX(100px);
// 	opacity: 0;
// }
// .list-leave-active{
// 	transition: all .5s;
// }
</style>
