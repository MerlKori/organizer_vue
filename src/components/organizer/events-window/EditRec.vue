<template>
<transition name="slideUp">
	<div
		v-show="editWinVisible"
		class="edit">
		<input
				v-model="editTitleVAl"
				type="text" class="edit__title" name="edit-title">
		<textarea
				v-model="editDescVAl"
				name="edit-desc" class="edit__desc"></textarea>
		<!-- PrioritySelect -->
		<priority-select />
		<div class="edit__btns-wrap">
			<button
				@click="editRec(editData._id)"
				class="edit__btns send-edit">Edit</button>
			<button
					@click="toggleVisEdit()"
					class="edit__btns cancel-edit">Cancel</button>
		</div>
	</div>
</transition>
</template>

<script>
import {mapGetters, mapActions, mapState, mapMutations} from 'vuex'
import PrioritySelect from '@/components/organizer/events-window/PrioritySelect'
export default {
	name: 'EditRec',
	components: {PrioritySelect},
	props: {
		editData: {
			type: Object
		}
	},
	data () {
		return {
			editTitleVAl: this.editData.title,
			editDescVAl: this.editData.desc
		}
	},
	methods: {
		...mapActions('winRecords', ['doFilter']),
		...mapMutations('winRecords', ['toggleVisEdit', 'getAllRecords']),
		editRec (id) {
			const xhr = new XMLHttpRequest()
			let formData = JSON.stringify([
				{
					_id: id
				},
				{
					date: this.isSelectDate,
					title: this.editTitleVAl,
					desc: this.editDescVAl,
					priority: {
						prVal: this.selectVal,
						prColor: this.colorTitle
					}
				}
			])
			xhr.onreadystatechange = () => {
				if (xhr.status === 200 && xhr.readyState === 4) {
					this.doFilter({
						answerArr: JSON.parse(xhr.responseText),
						selectData: this.isSelectDate}
					)
					this.getAllRecords(JSON.parse(xhr.responseText))
					this.toggleVisEdit()
				}
			}
			xhr.open('POST', 'http://localhost:9595/update')
			xhr.send(formData)
		}
	},
	computed: {
		...mapGetters('calendar', ['isSelectDate']),
		...mapState('winRecords', ['editWinVisible']),
		...mapState('Select', ['selectVal', 'colorTitle'])
	}
}
</script>

<style lang="scss" scoped>
$bd-color: #9e9e9e;
$text-color: rgba(0,0,0, .8);
$active-color: #26a69a;
$transition-time: .3s;
.edit {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100%;
	height: 100%;
	background-color: #fff;
	padding: 20px 15px;
	z-index: 30;
	transition: transform .6s, opacity .3s;
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
	height: 250px;
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
// animation
.slideUp-enter-active, .slideUp-leave-active {
	transition: transform .6s, opacity .3s;
}
.slideUp-enter, .slideUp-leave-to {
	opacity: 0;
	transform: translate(-50%, -150%);
}
</style>
