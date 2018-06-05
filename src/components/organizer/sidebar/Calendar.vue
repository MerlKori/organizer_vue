<template>
<div >
	<!-- CalendarHeader -->
	<calendar-header
		@showPrewMonth="prewMonth()"
		@showNextMonth="nexMonth()"
	/>
	<ul class="calendar__days-list">
		<li
			v-for="(title, index) in calendarData.daysTitle"
			:key="index"
		>
		{{title}}
		</li>
	</ul>
	<ul class="calendar" id="calendar">
		<li
			v-for="(val, index) in calendarItem"
			:key="index"
			:class="{'cell--active': isActiveCell(index), 'cell--current-month': isCurrentMonth(index)}"
			@click="changeDay(index)"
		>
		{{val}}
		<!-- TaskLabels -->
		<task-labels
			:class="{'rec--low': showRecLow(index, val, listValue[0].value), 'rec--med': showRecLow(index, val, listValue[1].value), 'rec--hig': showRecLow(index, val, listValue[2].value)}"
		/>
		</li>
	</ul>
	<div
		@click="returnToday()"
		class="calendar__tpday-date">
		<span>Today is:</span>
		<br>
		<span>{{isTodayDate}}</span>
	</div>
</div>
</template>

<script>
import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'
import CalendarHeader from '@/components/organizer/sidebar/CalendarHeader'
import TaskLabels from '@/components/organizer/sidebar/TaskLabels'
export default {
	name: 'Calendar',
	components: {CalendarHeader, TaskLabels},
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
		this.loadRecords(() => {
			this.doFilter({
				answerArr: this.allRecords,
				selectData: this.isSelectDate
			})
		})
	},
	methods: {
		...mapActions('winRecords', ['doFilter']),
		...mapMutations('winRecords', ['getAllRecords', 'toggleFlag']),
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
			this.doFilter({
				answerArr: this.allRecords,
				selectData: this.isSelectDate}
			)
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
			this.doFilter({
				answerArr: this.allRecords,
				selectData: this.isSelectDate}
			)
		},
		nexMonth () {
			this.showNexMonth()
			this.createCalendar()
			this.doFilter({
				answerArr: this.allRecords,
				selectData: this.isSelectDate}
			)
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
			this.toggleFlag()
		},
		loadRecords (callback) {
			const xhr = new XMLHttpRequest()
			let formData = JSON.stringify({
				test: 'test123'
			})
			xhr.onreadystatechange = () => {
				if (xhr.status === 200 && xhr.readyState === 4) {
					this.getAllRecords(JSON.parse(xhr.responseText))
					callback()
				}
			}
			xhr.open('POST', `${this.urlServer}findAll`)
			xhr.setRequestHeader('Content-Type', 'application/json')
			xhr.send(formData)
		},
		showRecLow (id, elVal, priority) {
			if ((id > this.visibleDaysPrewMonth()) && (id <= this.sumDaysPrewCurrentMonth())) {
				let arr = this.allRecords
				let thisDate = `${elVal} ${this.monthTitle[this.selectDate.month]} ${this.selectDate.year}`
				for (let index = 0; index < arr.length; index++) {
					if (arr[index].date === thisDate && arr[index].priority.prVal === priority) {
						return true
					}
				}
			}
		}
	},
	computed: {
		...mapState(['urlServer']),
		...mapState('calendar', ['todayDate', 'selectDate', 'monthTitle']),
		...mapState('winRecords', ['allRecords']),
		...mapState('Select', ['listValue']),
		...mapGetters('calendar', ['isSelectDate', 'isTodayDate'])
	}
}
</script>

<style lang="scss" scoped>
// ================= days-list ===============================
.calendar__days-list {
	display: flex;

	li {
		font-size: .7rem;
		font-weight: 500;
		color: #fff;
		padding: .5rem 0;
		text-align: center;
		width: calc(100% / 7);
	}
}
// =============================== calendar ================================
.calendar {
	display: flex;
	flex-wrap: wrap;

	li {
		position: relative;
		font-size: 1rem;
		color: #fff;
		width: calc(100% / 7);
		border-radius: 5px;
		padding: 13px 5px;
		margin: 2px 0;
		opacity: .4;
		overflow: hidden;
		text-align: center;
		transition: all .3s;
		cursor: pointer;
	}
	.cell--current-month.cell--active {
		background: rgba(255,255,255, .3);
	}
	.cell--current-month {
		opacity: 1;
	}
}
.calendar__tpday-date {
	text-align: center;
	margin: 10px auto 0;
	padding: 15px 0;
	max-width: 150px;
	border-radius: 5px;
	transition: background-color .3s;
	cursor: pointer;

	span {
		font-size: 1.2rem;
		color: rgba(255,255,255, .7);
	}

	&:hover {
		background-color: rgba(255,255,255, .1);
	}
}
</style>
