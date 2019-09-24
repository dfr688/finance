<template>
  <div class="home">
		<Swiper>
		<div class="top">
			<input type="text" placeholder="Hi！今天是你学习的第1天哦~" readonly onfocus="this.blur()"/>
		</div>
		<div class="options">
			<ul>
				<li class="option_one">
					<router-link to="/dailypractice">
						<span></span>
						<p>每日一练</p>
					</router-link>
				</li>
				<li class="option_two">
					<router-link to="/simulation">
						<span></span>
						<p>模拟试题</p>
					</router-link>
				</li>
				<li class="option_three">
					<router-link to="/orderpractice">
						<span></span>
						<p>顺序练习</p>
					</router-link>
				</li>
			</ul>
		</div>
		<div class="list">
			<p><i></i>精选好题</p>
			<ul>
				<li v-for="(item,index) in goodQuestions" :key="item.id">
					<router-link :to="{name:'questiondetail',params:{id:item.id}}">
						<div class="left">
							<i>{{ index + 1 }}</i>
						</div>
						<div class="middle">{{ item.title }}</div>
						<div class="right">
							<i></i>
						</div>
					</router-link>
				</li>
			</ul>
		</div>
		</Swiper>
  </div>
</template>

<script>
	import Swiper from '../public/Swiper'
	
export default {
  name: '',
  data () {
    return {
      goodQuestions: []
    }
  },
	components: {
		Swiper
	},
	created() {
		// 获取精选好题
		let token = localStorage.getItem("token");
		this.baseJs.ajaxReq("/question/api/question/featured",{},"get",token)
		.then(res => {
			// console.log(res);
			this.goodQuestions = res.data;
		})
		.catch(err => {
			console.log(err);
		})
	}
}
</script>


<style scoped>
	@import '../../assets/css/home.css';
</style>
