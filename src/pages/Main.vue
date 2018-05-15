<template>
<div class="organizer__wrapp">
	<!-- OrganizerHeader -->
	<organizer-header
		@showPrewMonth="prewMonth()"
		@showNextMonth="nexMonth()"
		@showCurrentDate="returnToday()"
	/>
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
	<events-window :dataCalendar="calendarData"/>
</div>
</template>

<script>
import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'
import OrganizerHeader from '@/components/organizer/OrganizerHeader'
import EventsWindow from '@/components/organizer/events-window/EventsWindow'
export default {
	name: 'Main',
	components: {OrganizerHeader, EventsWindow},
	data () {
		return {
			calendarData: {
				daysTitle: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
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
		this.loadRecords()
		// this.searchRec()
	},
	methods: {
		...mapActions('winRecords', ['doFilter']),
		...mapMutations('winRecords', ['toggleVisible', 'getAllRecords']),
		...mapMutations('calendar', ['showPrewMonth', 'showNexMonth', 'goTodaytDate', 'defaultSelectDate']),
		initCalendarData () {
			this.defaultSelectDate()
			this.activCell = (this.visibleDaysPrewMonth() + this.selectDate.day)
		},
		daysInMonth (year, month) {
			return 33 - new Date(year, month, 33).getDate()
		},
		positionFirstDay (year, month) {
			return new Date(year, month).getDay()
		},
		//  positionFirstDay - 1 количество дней до первого дня месяца
		visibleDaysPrewMonth () {
			return (this.positionFirstDay(this.selectDate.year, this.selectDate.month) - 1)
		},
		//  this.calendarData.selectMonth - 1 предидущий месяц
		firstVisibleDaysPrewMonth () {
			return (this.daysInMonth(this.selectDate.year, (this.selectDate.month - 1)) - this.visibleDaysPrewMonth())
		},
		sumDaysPrewCurrentMonth () {
			let daysPrew = this.visibleDaysPrewMonth()
			let daysCurren = this.daysInMonth(this.selectDate.year, this.selectDate.month)
			return daysPrew + daysCurren
		},
		createCalendar () {
			let positionFirstDay = this.positionFirstDay(this.selectDate.year, this.selectDate.month)
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
			this.activCell = (this.visibleDaysPrewMonth() + this.selectDate.day)
		},
		returnToday () {
			this.goTodaytDate()
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
		},
		prewMonth () {
			this.showPrewMonth()
			this.createCalendar()
		},
		nexMonth () {
			this.showNexMonth()
			this.createCalendar()
		},
		changeDay (index) {
			this.selectDate.day = this.calendarItem[index]
			if (index > this.sumDaysPrewCurrentMonth()) {
				this.calendarData.selectMonth++
				this.createCalendar()
			} else if (index < this.positionFirstDay(this.calendarData.selectYear, this.calendarData.selectMonth)) {
				this.calendarData.selectMonth--
				this.createCalendar()
			} else {
				this.activCell = index
			}

			this.doFilter({
				answerArr: this.allRecords,
				selectData: this.isSelectDate}
			)

			this.toggleVisible()
		},
		loadRecords () {
			const xhr = new XMLHttpRequest()
			let formData = JSON.stringify({
				test: 'test123'
			})
			xhr.onreadystatechange = () => {
				if (xhr.status === 200 && xhr.readyState === 4) {
					this.getAllRecords(JSON.parse(xhr.responseText))
				}
			}
			xhr.open('POST', 'http://localhost:9595/find-all-rec')
			xhr.send(formData)
		}
		// searchRec () {
		// 	let Alldate = this.allRecords.map(item => {
		// 		return item.date
		// 	})
		// }
	},
	computed: {
		...mapState('calendar', ['todayDate', 'selectDate']),
		...mapState('winRecords', ['allRecords']),
		...mapGetters('calendar', ['isSelectDate'])
	}
}
</script>

<style lang="scss" scoped>
// ============= variaqbles ===========
$border-color: #fff;

.organizer__wrapp {
	height: 100vh;
	background: linear-gradient(to bottom, #0d47a1 , #1565c0, #1976d2);
}
// ================= days-list ===============================
.days-list {
	display: flex;

	li {
		font-size: 1.25rem;
		font-weight: 700;
		color: #fff;
		padding: .5rem 0;
		text-align: center;
		width: calc(100% / 7);
	}
}
// ============ calendar ========
.calendar span {
	display: flex;
	flex-wrap: wrap;

	li {
		font-size: 1.25rem;
		color: #fff;
		width: calc(100% / 7);
		height: calc((100vh - 95.6px) / 6);
		padding: 10px 0 0 10px;
		border-right: 1px solid $border-color;
		border-top: 1px solid $border-color;
		opacity: .4;
		transition: all .3s;
		cursor: pointer;
	}
	.cell--current-month.cell--active {
		background: tomato;
	}
	.cell--current-month {
		opacity: 1;
		border: 1px solid $border-color;
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
