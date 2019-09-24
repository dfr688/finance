<template>
  <div class="simulation">
		<Swiper>
		<HeaderTop title="模拟试题"/>
		<ListsDiff :paperLists="paperLists"/>
		</Swiper>
  </div>
</template>

<script>
	import HeaderTop from '../public/HeaderTop'
	import ListsDiff from '../public/ListsDiff'
	import Swiper from '../public/Swiper'
	
export default {
  name: '',
  data () {
    return {
      paperLists: []
    }
  },
	components: {
		HeaderTop,
		ListsDiff,
		Swiper
	},
	created() {
		let token = localStorage.getItem("token");
		this.baseJs.ajaxReq("/question/api/paper",{},"get",token)
		.then(res => {
			// console.log(res);
			this.paperLists = res.data;
		})
		.catch(err => {
			console.log(err);
		})
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.simulation{
		height: 100%;
	}
</style>
