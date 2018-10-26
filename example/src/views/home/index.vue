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
				sa
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
					children: []
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
	padding: 2vw 5vw;
}
</style>
