<template>
  <div id="app">
    <router-view/>
		<Tabbar v-show="isSee"/>
  </div>
</template>

<script>
	import Tabbar from './components/public/Tabbar'
	
export default {
  name: 'App',
	data() {
		return {
			isSee: true
		}
	},
  components: {
		Tabbar
  },
	watch: {
		$route(to,from) {
			// 判断是否显示Tabbar
			if(to.name == 'home' || to.name == 'my'){
				this.isSee = true;
			}else{
				this.isSee = false;
			}
		}
	},
	created() {
		if(this.$route.name == 'home' || this.$route.name == 'my'){
			this.isSee = true;
		}else{
			this.isSee = false;
		}
	}
}
</script>

<style>

</style>
