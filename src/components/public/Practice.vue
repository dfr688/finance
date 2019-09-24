<template>
	<Swiper ref="mySwiper">
	<swiper :options="swiperOption" class="swiper">
		<swiper-slide class="text" v-for="(question,index) in questions" :key="question.id">
			<div class="practice">
					<div class="top">
						<div>
							<i @click="goBack"></i>
						</div>
						<div>
							<span @click="collection(question.id)" :class="{active:isShow.indexOf(question.id) > -1 }"></span>
						</div>
					</div>
					<div class="questions">
						<p class="title">{{ question.title }}</p>
						<ul>
							<li @click="goAnswer(question.id,'A')">
								A. {{ question.option_a }}
								<div v-if="myOption(question.id) == 'A'">
									<i v-show="bingo(question.id)"></i>
									<span v-show="!bingo(question.id)"></span>
								</div>
							</li>
							<li @click="goAnswer(question.id,'B')">
								B. {{ question.option_b }}
								<div v-if="myOption(question.id) == 'B'">
									<i v-show="bingo(question.id)"></i>
									<span v-show="!bingo(question.id)"></span>
								</div>
							</li>
							<li @click="goAnswer(question.id,'C')">
								C. {{ question.option_c }}
								<div v-if="myOption(question.id) == 'C'">
									<i v-show="bingo(question.id)"></i>
									<span v-show="!bingo(question.id)"></span>
								</div>
							</li>
							<li @click="goAnswer(question.id,'D')">
								D. {{ question.option_d }}
								<div v-if="myOption(question.id) == 'D'">
									<i v-show="bingo(question.id)"></i>
									<span v-show="!bingo(question.id)"></span>
								</div>
							</li>
						</ul>
						<div class="analys" v-if="isSee !== index">
							<span @click="goAnalys(index)">查看解析<i></i></span>
						</div>
						<!-- 解题思路 -->
						<div class="thinking" v-if="isSee === index">
							<div class="tit">解题思路<i></i></div>
							<div class="content">
								<p>正确答案: {{ question.real_option }}</p>
								<p>{{ question.note }}</p>
							</div>
						</div>
					</div>
			</div>
		</swiper-slide>
	</swiper>
	</Swiper>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	import 'swiper/dist/css/swiper.css'
	import { Toast } from 'mint-ui';
	import Swiper from '../public/Swiper'
	
export default {
  name: '',
  data () {
    return {
      isSee: false,
	  swiperOption: {
	  	direction: 'horizontal',
	  	slidesPerView: 'auto',
	  	freeMode: false,
	  	freeModeMomentum : true,
	  	setWrapperSize: true,
		on:{
		   slideChange: () => {
			let mySwiper = this.$refs.mySwiper;
			let swiper2 = mySwiper.$children[0];
			// console.log(swiper2.swiper.$wrapperEl[0]);
			swiper2.swiper.$wrapperEl[0].style.transform = "translate3d(0px, 0px, 0px)";
			// animate({ scrollTop: 0 }, 10);
		   }
		  }
	  	// mousewheel:true,
	  	},
		isShow: [],//存放所有已收藏的id
		subjects: [],//存放每一题的用户选择和是否回答正确
    }
  },
  props: [
	  "questions"
  ],
  watch: {
  	  questions(val){
  		  for (var i = 0; i < val.length; i++) {
  			if(val[i].collectioned == 1){
  				this.isShow.push(val[i].id);
  			}
  		  }
  	  }
  },
  computed: {
  		myOption(id) {
  			return function(id){
  				for(let i = 0;i<this.subjects.length;i++){
  					if(this.subjects[i].id === id){
  						return this.subjects[i].myOption;
  					}
  				}
  				return false;
  			}
  		},
  		bingo(id) {
  			return function(id){
  				for(let i = 0;i<this.subjects.length;i++){
  					if(this.subjects[i].id === id){
  						return this.subjects[i].bingo;
  					}
  				}
  				return false;
  			}
  		}
  },
  components: {
	  swiper,
	  swiperSlide,
	  Swiper
  },
  methods: {
	  goBack() {
		  this.$router.go(-1);
	  },
	  // 查看解析
	  goAnalys(index) {
		  this.isSee = index;
	  },
	  // 收藏与取消收藏
	  collection(id) {
		  if(this.isShow.indexOf(id) > -1){
			  //取消收藏
			  for (var i = 0; i < this.isShow.length; i++) {
				if (this.isShow[i] == id) {
					this.isShow.splice(i, 1);
					break;
				}
			  }
			  let token = localStorage.getItem("token");
			  this.baseJs.httpReq("/question/api/user/question/collection",id,{},"delete",token)
			  .then(res => {
			  	// console.log(res);
			  	// console.log(this.questions);
				if(res.code == 200){
					Toast({
					  message: '取消收藏成功！',
					  duration: 1000
					});
				}
			  })
			  .catch(err => {
			  	console.log(err);
			  })
		  }else{
			  //加入收藏
			   this.isShow.push(id);
			  let token = localStorage.getItem("token");
			  this.baseJs.ajaxReq("/question/api/user/question/collection",{questionId:id},"put",token)
			  .then(res => {
			  	// console.log(res);
				if(res.code == 200){
					Toast({
					  message: '收藏成功！',
					  duration: 1000
					});
				}
			  })
			  .catch(err => {
			  	console.log(err);
			  })
		  }
	  },
	  // 答题
	  goAnswer(id,option) {
	  		  //判断是否已经答过
	  		  for(let i = 0;i<this.subjects.length;i++){
	  		  	if(this.subjects[i].id === id){
	  		  		return false;
	  		  	}
	  		  }
	  		  
	  		  let a = {
	  			  id:id,
	  			  myOption:option,
	  		  }
	  		  let token = localStorage.getItem("token");
	  		  this.baseJs.ajaxReq("/question/api/user/question/answer",{questionId:id,answer:option},"put",token)
	  		  .then(res => {
	  			  // console.log(res);
	  			  
	  			  //记错题
	  			  if(!res.data.bingo){
	  				  this.mistakes(a);
	  			  }
	  			  
	  			  a.bingo = res.data.bingo;
	  			  this.subjects.push(a);
	  		  })
	  		  .catch(err => {
	  			  console.log(err);
	  		  })
	  },
	  // 错题
	  mistakes(obj){
		  /*
			  let token = localStorage.getItem("token");
			  //判断是否已经收藏为错题，避免重复收藏
			  this.baseJs.ajaxReq("/question/api/user/question/mistake",{},"get",token)
			  .then(res => {
			  	console.log(res);
				for(let i=0;i<res.data.length;i++){
					if(res.data[i].id === obj.id){
						return false;
					}
				}
				this.baseJs.ajaxReq("/question/api/user/question/mistake",{questionId:obj.id,option:obj.myOption},"put",token)
				.then(res => {
					console.log(res,2);
				})
				.catch(err => {
					console.log(err);
				})
			  })
			  .catch(err => {
			  	console.log(err);
			  })
		  */
	  }
  },
  created() {
	 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import '../../assets/css/practice.css';
</style>
