<template>
	<div class="home-view">
		<h1>V5 Home Page</h1>
		<v5-collapse 
			v-for="(item ,index) in list"
			:key="index"
			:title="item.label" 
			:icon="item.icon"
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
					children: [
						{
							title: 'Icon',
							subTitel: '图标',
							icon: 'right'
						},
						{
							title: 'Cell',
							subTitel: '单元格',
							icon: 'right'
						},
						{
							title: 'Collapse',
							subTitel: '折叠面板',
							icon: 'right'
						},
					]
				},
				{
					label: '表单',
					icon: 'form',
					children: []
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
