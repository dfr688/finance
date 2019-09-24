<template>
  <div class="questionDetail">
		<Swiper>
		<div class="practice">
				<div class="top">
					<div>
						<i @click="goBack"></i>
					</div>
					<div>
						<span class="practice_delete" @click="goDelete"></span>
					</div>
				</div>
				<div class="questions">
					<p class="title">{{ detail.title }}</p>
					<ul>
						<li @click="goAnswer(detail.id,'A')">
							A. {{ detail.option_a }}
							<div v-if="myOption == 'A'">
								<i v-show="bingo === true"></i>
								<span v-show="bingo === false"></span>
							</div>
						</li>
						<li @click="goAnswer(detail.id,'B')">
							B. {{ detail.option_b }}
							<div v-if="myOption == 'B'">
								<i v-show="bingo === true"></i>
								<span v-show="bingo === false"></span>
							</div>
						</li>
						<li @click="goAnswer(detail.id,'C')">
							C. {{ detail.option_c }}
							<div v-if="myOption == 'C'">
								<i v-show="bingo === true"></i>
								<span v-show="bingo === false"></span>
							</div>
						</li>
						<li @click="goAnswer(detail.id,'D')">
							D. {{ detail.option_d }}
							<div v-if="myOption == 'D'">
								<i v-show="bingo === true"></i>
								<span v-show="bingo === false"></span>
							</div>
						</li>
					</ul>
					<div class="analys" v-if="isSee">
						<span @click="goAnalys()">查看解析<i></i></span>
					</div>
					<!-- 解题思路 -->
					<div class="thinking" v-if="!isSee">
						<div class="tit">解题思路<i></i></div>
						<div class="content">
							<p>正确答案:{{ detail.real_option }}</p>
							<p>{{ detail.note }}</p>
						</div>
					</div>
				</div>
		</div>
		</Swiper>
  </div>
</template>

<script>
	import Swiper from '../public/Swiper'
	import { Toast } from 'mint-ui';
	
export default {
  name: '',
  data () {
    return {
        isShow: false,
		isSee: true,
		questionId: "",
		detail: "",
		myOption: "",
		bingo: ""
    }
  },
	components: {
		Swiper
	},
	methods: {
		goBack() {
			this.$router.go(-1);
		},
		  // 查看解析
		  goAnalys() {
			  this.isSee = false;
		  },
			// 删除错题
			goDelete() {
				let token =localStorage.getItem("token");
				this.baseJs.httpReq("/question/api/user/question/mistake",this.questionId,{},"delete",token)
				.then(res => {
					// console.log(res);
					if(res.code == 200){
						Toast({
 				  		  message: '删除成功！',
 				  		  duration: 1000
 				  		});
						this.$router.push("/mistakes");
					}
				})
				.catch(err => {
					console.log(err);
				})
			},
			// 答题
			goAnswer(id,option) {
				  //判断是否已经答过
				  if(this.myOption){
					  return false;
				  }
				  this.myOption = option;
				  let token = localStorage.getItem("token");
				  this.baseJs.ajaxReq("/question/api/user/question/answer",{questionId:id,answer:option},"put",token)
				  .then(res => {
					  // console.log(res);
					  this.bingo = res.data.bingo;
				  })
				  .catch(err => {
					  console.log(err);
				  })
			},
		  // 收藏与取消收藏
// 		  collection() {
// 			  if(this.isShow){
// 				  //取消收藏
// 				  this.isShow = false;
// 				  let token = localStorage.getItem("token");
// 				  this.baseJs.httpReq("/question/api/user/question/collection",this.questionId,{},"delete",token)
// 				  .then(res => {
// 				  	// console.log(res);
// 				  	if(res.code == 200){
// 				  		Toast({
// 				  		  message: '取消收藏成功！',
// 				  		  duration: 1000
// 				  		});
// 				  	}
// 				  	// console.log(this.questions);
// 				  })
// 				  .catch(err => {
// 				  	console.log(err);
// 				  })
// 			  }else{
// 				  //加入收藏
// 				  this.isShow = true;
// 				  let token = localStorage.getItem("token");
// 				  this.baseJs.ajaxReq("/question/api/user/question/collection",{questionId:this.questionId},"put",token)
// 				  .then(res => {
// 				  	// console.log(res);
// 				  	if(res.code == 200){
// 				  		Toast({
// 				  		  message: '收藏成功！',
// 				  		  duration: 1000
// 				  		});
// 				  	}
// 				  })
// 				  .catch(err => {
// 				  	console.log(err);
// 				  })
// 			  }
// 		  }
	},
	created() {
		this.questionId = this.$route.params.id;
		let token = localStorage.getItem("token");
		this.baseJs.httpReq("/question/api/question",this.questionId,{},"get",token)
		.then(res => {
			// console.log(res);
			this.detail = res.data;
			if(this.detail.collectioned === 0){
				this.isShow = false;
			}else{
				this.isShow = true;
			}
		})
		.catch(err => {
			console.log(err);
		})
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import '../../assets/css/practice.css';
</style>
