<template>
  <div class="tabbar">
		<ul>
			<li class="home" @click="goHome">
				<span :class="{active:isShow}"></span>
				<p>首页</p>
			</li>
			<li class="fast_practice" @click="goFastPractice">
				<span></span>
				<p>快速练习</p>
			</li>
			<li class="my" @click="goMy">
				<span :class="{active:!isShow}"></span>
				<p>我的</p>
			</li>
		</ul>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      isShow: true
    }
  },
	methods: {
		goHome() {
			this.$router.push("/home");
			this.isShow = true;
		},
		goFastPractice() {
			this.$router.push("/fastpractice");
		},
		goMy() {
			this.$router.push("/my");
			this.isShow = false;
		}
	},
	watch: {
		$route(to,from) {
			if(to.name == 'home'){
				this.isShow = true;
			}else if(to.name == 'my'){
				this.isShow = false;
			}
		}
	},
	created() {
		if(this.$route.name =="home"){
			this.isShow = true;
		}else if(this.$route.name =="my"){
			this.isShow = false;
		}
	}
}
</script>


<style scoped>
	.tabbar ul{
		display: flex;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		background-color: #fff;
		box-shadow: 0px 0px 5px 0px rgba(8, 8, 9, 0.4);
		font-size: .22rem;
		padding: .2rem 0;
		z-index: 1;
	}
	.tabbar ul li{
		flex: 1;
		text-align: center;
	}
	.tabbar ul li span{
		display: inline-block;
	}
	.tabbar ul .home span{
		width: .47rem;
		height: .4rem;
		background: url(../../assets/images/public/home.png) no-repeat left top;
		background-size: 100%;
	}
	.tabbar ul .home span.active{
		background: url(../../assets/images/public/home_active.png) no-repeat left top;
		background-size: 100%;
	}
	.tabbar ul .fast_practice span{
		width: .41rem;
		height: .41rem;
		background: url(../../assets/images/public/fast_practice.png) no-repeat left top;
		background-size: 100%;
	}
	.tabbar ul .my span{
		width: .38rem;
		height: .43rem;
		background: url(../../assets/images/public/my.png) no-repeat left top;
		background-size: 100%;
	}
	.tabbar ul .my span.active{
		background: url(../../assets/images/public/my_active.png) no-repeat left top;
		background-size: 100%;
	}
</style>
