<template>
  <div class="my">
		<Swiper>
		<div class="top">
			<div class="top_key">
				<div>
					<span @click="goBack"></span>
				</div>
				<div>
					<i @click="goSet"></i>
				</div>
			</div>
			<div class="info">
				<img src="../../assets/images/my/header.png" alt=""/>
				<div v-show="isShow" @click="Login">登录/注册</div>
				<p v-show="!isShow">{{ phone }}</p>
			</div>
			<div class="signOut" v-if="isSee">
				<ul>
					<li @click="goForget">
						修改密码
					</li>
					<li @click="goSignOut">
						退出登录
					</li>
				</ul>
			</div>
		</div>
		<div class="duration">
			<ul>
				<li>
					<p>总答题数</p>
					<div><span>{{ answerCount }}</span> 题</div>
				</li>
				<li>
					<p>今日答题数</p>
					<div><span>{{ todayCount }}</span> 题</div>
				</li>
			</ul>
		</div>
		<div class="my_list">
			<ul>
				<li>
					<div class="left">
						<i></i>
					</div>
					<div class="right">
						<router-link to="/mistakes">
							<span>我的错题集</span>
							<div>
								<i></i>
							</div>
						</router-link>
					</div>
				</li>
				<li>
					<div class="left">
						<i></i>
					</div>
					<div class="right">
						<router-link to="/collection">
							<span>我的收藏夹</span>
							<div>
								<i></i>
							</div>
						</router-link>
					</div>
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
      isShow: true,
	  phone: "",
	  isSee: false,
	  answerCount: "",
	  todayCount: ""
    }
  },
	components: {
		Swiper
	},
	methods: {
		Login() {
			this.$router.push("/login");
		},
		 // 隐藏手机中间四位
		geTel(tel) {
			return tel.substring(0, 3)+"****"+tel.substr(tel.length-4);
		},
		// 点击设置按钮
		goSet() {
			this.isSee = !this.isSee;
		},
		// 点击修改密码
		goForget() {
			this.$router.push("/forget");
		},
		// 点击退出登录
		goSignOut() {
			localStorage.removeItem("phone");
			localStorage.removeItem("token");
			this.isShow = true;
			this.$router.push("/login");
		},
		goBack() {
			this.$router.go(-1);
		}
	},
	created() {
		this.phone = localStorage.getItem("phone");
		if(this.phone != null){
		  this.phone = this.geTel(this.phone);
		  this.isShow = false;
		}
		let token = localStorage.getItem("token");
		this.baseJs.ajaxReq("/question/api/user",{},"get",token)
		.then(res => {
			// console.log(res);
			this.answerCount = res.data.answerCount;
			this.todayCount = res.data.todayCount;
		})
		.catch(err => {
			console.log(err);
		})
	}
}
</script>


<style scoped>
	@import '../../assets/css/my.css';
</style>
