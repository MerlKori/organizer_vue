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
	font-size: 1rem;
	color: rgba(0,0,0, .8);
	background-color: #fff;
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
	background-color: #fff;
	border: 1px solid #9e9e9e;

	li {
		font-size: .85rem;
		color: rgba(0,0,0, .8);
		padding: 5px 10px;
		border-bottom: 1px solid #9e9e9e;
		transition: background-color .25s;
		cursor: pointer;

		&:hover {
			background-color: rgba(38,166,154, .2);
		}
	}
}
</style>
