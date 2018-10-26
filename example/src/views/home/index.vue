<template>
	<div class="home-view">
		<h1>V5 Home Page</h1>
		<hi />
		<v5-collapse title="表单" icon="form">
			<div class="list-inner">
				sa
			</div>
		</v5-collapse>
	</div>
</template>

<script>
import hi from '@/modules/hi.vue'

export default {
	name: 'home',
	components: {
		hi
	}
}
</script>

<style lang="scss" scoped>
.list-inner {
	padding: 2vw 5vw;
}
</style>
