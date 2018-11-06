<template>
	<div id="app">
		<ilink :list="navs" />
		<router-view/>
	</div>
</template>

<script>
export default {
	name: 'app',
	data () {
		return {
			navs: [
				{
					lable: 'Home',
					to: '/'
				},
				{
					lable: 'About',
					to: '/about',
					children: [
						{
							lable: 'me',
							to: '/about/me'
						},
						{
							lable: 'friends',
							to: '/about/friends',
							children: [
								{
									lable: 'tom',
									to: '/about/friends/tom'
								},
								{
									lable: 'jerry',
									to: '/about/friends/jerry'
								}
							]
						}
					]
				},
				{
					lable: 'user',
					to: '/user',
					children: [
						{
							lable: 'info',
							to: '/user/info'
						},
						{
							lable: 'safe',
							to: '/user/safe'
						}
					]
				}
			]
		}
	}
}
</script>

<style lang="scss">
@import url('./assets/css/reset-1.4.0.css');
@import '../../src/styles/index.scss';
body {
	background: #f5f5f5;
}
</style>


<style lang="scss" scoped>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
}
#nav {
	padding: .5rem;
	a {
		display: block;
		font-weight: bold;
		font-size: 0.4rem;
		color: #2c3e50;
		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>
