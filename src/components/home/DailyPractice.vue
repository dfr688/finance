<template>
  <div class="dailyPractice">
	<!-- <Swiper> -->
		<Practice :questions="questions"/>
	<!-- </Swiper> -->
  </div>
</template>

<script>
	import Practice from '../public/Practice'
	// import Swiper from '../public/Swiper'
	
export default {
  name: '',
  data () {
    return {
		questions: []
    }
  },
	components: {
		Practice,
		// Swiper
	},
	created() {
		let token = localStorage.getItem("token");
		this.baseJs.ajaxReq("/question/api/question/daily",{},"get",token)
		.then(res => {
			// console.log(res);
			this.questions = res.data;
			// console.log(this.questions);
		})
		.catch(err => {
			console.log(err);
		})
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.dailyPractice{
		height: 100%;
	}
</style>
