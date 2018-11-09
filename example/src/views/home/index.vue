<template>
	<div class="home-view">
		<h1>V5 Home Page</h1>
		<v5-collapse 
			v-for="(item ,index) in list"
			:key="index"
			:title="item.label" 
			:icon="item.icon"
			:open="item.open"
		>
			<div class="list-inner">
				<v5-cell 
					v-for="list in item.children"
					:key="list.title"
					:title="list.title" 
					:sub-title="list.subTitel"
					:href="list.href"
					:to="list.to"
					:icon="list.icon"
				>
				</v5-cell>
			</div>
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
							icon: 'right',
							to: '/base/icon'
						},
						{
							title: 'Cell',
							subTitel: '单元格',
							icon: 'right',
							to: '/base/cell'
						},
						
					]
				},
				{
					label: '表单',
					icon: 'form',
					children: []
				},
				{
					label: '复合组件',
					icon: '',
					open: true,
					children: [
						{
							title: 'Tree',
							subTitel: '树',
							to: ''
						},
						{
							title: 'Collapse',
							subTitel: '折叠面板',
							icon: 'right',
							to: ''
						},
					]
				}
			]
		}
	}
}
</script>

<style lang="scss" scoped>
.list-inner {
	padding: 0 0 0 4vw;
}
</style>
