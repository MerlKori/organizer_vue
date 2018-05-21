<template>
<div class="select">
	<h3
		@click="toggleList()"
		:style="{color: colorTitle, borderBottom: '1px solid ' + colorTitle}"
		class="select__title">
		{{selectVal}}
	</h3>
	<ul
		v-show="visibleList"
		class="select__list-val">
		<li
			v-for="(elem, index) in listValue"
			:key="index"
			@click="chamgeVal(index)">
			{{elem.value}}
		</li>
	</ul>
</div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
	name: 'PrioritySelect',
	data () {
		return {
			visibleList: false
		}
	},
	methods: {
		...mapMutations('Select', ['selectValue']),
		toggleList () {
			this.visibleList = !this.visibleList
		},
		chamgeVal (index) {
			this.selectValue(index)
			this.toggleList()
		}
	},
	computed: {
		...mapState('Select', ['listValue', 'selectVal', 'colorTitle'])
	}
}
</script>

<style lang="scss" scoped>
.select {
	position: relative;
	width: 200px;
	margin-bottom: 15px;
}
.select__title {
	font-size: 1.2rem;
	font-weight: 400;
	color: rgba(0,0,0, .8);
	background-color: rgba(255,255,255, 0);
	padding: 5px 10px;
	border-bottom: 1px solid #9e9e9e;
	transition: all .3s;
	cursor: pointer;
}
.select__list-val {
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	background-color: rgba(0,0,0, .7);
	border: 1px solid rgba(255,255,255, .7);

	li {
		font-size: .85rem;
		font-weight: 500;
		color: rgba(255,255,255, 1);
		padding: 5px 10px;
		border-bottom: 1px solid rgba(255,255,255, .7);
		transition: background-color .25s;
		cursor: pointer;

		&:first-child:hover {
			background-color: var(--green);
		}
		&:nth-child(2):hover {
			background-color: var(--yellow);
		}
		&:last-child:hover {
			background-color: var(--red);
		}
	}
}
</style>
