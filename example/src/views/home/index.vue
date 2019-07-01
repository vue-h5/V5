<template>
	<div class="home-view">
		<h1>V5</h1>
		<v5-collapse 
			v-for="(item ,index) in list"
			:key="index"
			:title="item.label" 
			:icon="item.icon"
			:open="item.open"
		>
			<v5-cell-group class="list-inner">
				<v5-cell 
					v-for="list in item.children"
					:key="list.title"
					:title="list.title" 
					:sub-title="list.subTitel"
					:href="list.href"
					:to="list.to"
					:icon="list.icon"
				></v5-cell>
			</v5-cell-group>
		</v5-collapse>
	</div>
</template>

<script>

export default {
	name: 'home',
	components: {},
	data () {
		return {
			list: [
				{
					label: '基础组件',
					icon: 'component',
					open: true,
					children: [
						{
							title: 'Icon',
							subTitel: '图标',
							to: '/base/icon'
						},
						{
							title: 'Button',
							subTitel: '按钮',
							to: '/base/button'
						},
						{
							title: 'Cell',
							subTitel: '单元格',
							to: '/base/cell'
						},
						{
							title: 'Layer',
							subTitel: '弹层',
							to: '/base/layer'
						},
						{
							title: 'LoadingBar',
							subTitel: '加载进度条',
							to: '/base/loadingBar'
						},
						{
							title: 'Marquee',
							subTitel: '弹幕',
							to: '/base/marquee'
						},
						{
							title: 'Swiper',
							subTitel: '轮播图',
							to: '/base/swiper'
						},
					]
				},
				{
					label: '复合组件',
					icon: '',
					open: true,
					children: [
						{
							title: 'Alert',
							subTitel: '弹层对话框',
							to: '/complex/alert'
						},
						{
							title: 'Cascader',
							subTitel: '集联选择器',
							to: '/complex/cascader'
						},
						{
							title: 'CellGroup',
							subTitel: '单元格组',
							to: '/complex/cellGroup'
						},
						{
							title: 'Collapse',
							subTitel: '折叠面板',
							to: ''
						},
						{
							title: 'SortBox',
							subTitel: '排序盒子',
							to: '/complex/sortBox'
						},
					]
				},
				{
					label: '表单',
					icon: 'form',
					open: true,
					children: [
						{
							title: 'From',
							subTitel: '表单',
							to: '/form/form'
						},
						{
							title: 'Picker',
							subTitel: '选择器',
							to: '/form/picker'
						},
						{
							title: 'Datepicker',
							subTitel: '时间选择器',
							to: '/form/datepicker'
						},
					]
				},
			]
		}
	}
}
</script>

<style lang="scss" scoped>
.list-inner::after {
	border: none;
}
</style>
