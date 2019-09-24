<template>
  <div class="collection">
		<Swiper>
			<HeaderTop title="收藏夹"/>
			<Lists :practiceLists="practiceLists"/>
		</Swiper>
  </div>
</template>

<script>
	import HeaderTop from '../public/HeaderTop'
	import Swiper from '../public/Swiper'
	import Lists from '../public/Lists'
	
export default {
  name: '',
  data () {
    return {
      practiceLists: []
    }
  },
	components: {
		HeaderTop,
		Swiper,
		Lists
	},
	created() {
		let token = localStorage.getItem("token");
		this.baseJs.ajaxReq("/question/api/user/question/collection",{},"get",token)
		.then(res => {
			// console.log(res);
			this.practiceLists = res.data;
		})
		.catch(err => {
			console.log(err);
		})
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.collection{
		height: 100%;
	}
</style>
