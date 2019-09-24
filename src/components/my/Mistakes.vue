<template>
  <div class="mistake">
		<Swiper>
			<HeaderTop title="错题集"/>
			<ListsM :practiceLists="practiceLists"/>
		</Swiper>
  </div>
</template>

<script>
	import HeaderTop from '../public/HeaderTop'
	import Swiper from '../public/Swiper'
	import ListsM from '../public/ListsM'
	
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
		ListsM
	},
	created() {
		let token = localStorage.getItem("token");
		this.baseJs.ajaxReq("/question/api/user/question/mistake",{},"get",token)
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
	.mistake{
		height: 100%;
	}
</style>
