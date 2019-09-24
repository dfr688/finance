<template>
  <div class="practiceComDiff">
   <Swiper ref="mySwiper">
   	<swiper :options="swiperOption" class="swiper">
   		<swiper-slide class="text" v-for="(list,index) in lists" :key="list.id">
   			<div class="practiceDiff">
   					<div class="top">
   						<div>
   							<i class="back" @click="goBack"></i>
   						</div>
   						<div>
   							<i class="icon_01" @click="goCard"></i><p @click="goHandIn">交卷<i class="icon_02"></i></p>
   						</div>
   						<div>
   							<span @click="collection(list.id)" :class="{active:isShow.indexOf(list.id) > -1 }"></span>
   						</div>
   					</div>
   					<div class="questions">
   						<p class="title">{{ list.title }}</p>
   						<ul>
   							<li @click="goAnswer(list.id,'A')">
   								A. {{ list.option_a }}
   								<div v-if="myOption(list.id) == 'A'">
   									<i v-show="bingo(list.id)"></i>
   									<span v-show="!bingo(list.id)"></span>
   								</div>
   							</li>
   							<li @click="goAnswer(list.id,'B')">
   								B. {{ list.option_b }}
   								<div v-if="myOption(list.id) == 'B'">
   									<i v-show="bingo(list.id)"></i>
   									<span v-show="!bingo(list.id)"></span>
   								</div>
   							</li>
   							<li @click="goAnswer(list.id,'C')">
   								C. {{ list.option_c }}
   								<div v-if="myOption(list.id) == 'C'">
   									<i v-show="bingo(list.id)"></i>
   									<span v-show="!bingo(list.id)"></span>
   								</div>
   							</li>
   							<li @click="goAnswer(list.id,'D')">
   								D. {{ list.option_d }}
   								<div v-if="myOption(list.id) == 'D'">
   									<i v-show="bingo(list.id)"></i>
   									<span v-show="!bingo(list.id)"></span>
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
								<p>正确答案:{{ list.real_option }}</p>
   								<p>{{ list.note }}</p>
   							</div>
   						</div>
   					</div>
   			</div>
   		</swiper-slide>
   	</swiper>
   </Swiper>
   <mt-popup
     v-model="popupVisible"
     popup-transition="popup-fade">
   	<div class="hand_in">
		<p>您确定要交卷吗？</p>
		<ul>
			<li @click="hand">
				交卷
			</li>
			<li @click="goOn">
				继续做题
			</li>
		</ul>
	</div>
   </mt-popup>
  </div>
</template>

<script>
	import Swiper from './Swiper'
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	import 'swiper/dist/css/swiper.css'
	import { Toast } from 'mint-ui';
	
export default {
  name: '',
  data () {
    return {
      swiperOption: {
		initialSlide:this.qid,
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
		popupVisible: false,
		isSee: false,
		isShow: [],//存放所有已收藏的id
		// subjects: [],//存放每一题的用户选择和是否回答正确
    }
  },
  props: [
	  "lists","qid","subjects"
  ],
	components: {
		Swiper,
		swiper,
		swiperSlide
	},
	watch: {
		  lists(val){
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
							console.log(res);
						})
						.catch(err => {
							console.log(err);
						})
				  })
				  .catch(err => {
				  	console.log(err);
				  })
			*/
		},
		// 点击交卷
		goHandIn() {
			this.popupVisible = true;
		},
		// 点击弹框中的交卷
		hand() {
			var listId = this.$route.params.id;
			this.$router.push({name:"hand",query:{listId:listId,lists:JSON.stringify(this.lists),subjects:JSON.stringify(this.subjects)}});
		},
		// 点击继续做题
		goOn() {
			this.popupVisible = false;
		},
		// 答题卡
		goCard() {
			var listId = this.$route.params.id;
			this.$router.push({name:"card",query:{listId:listId,lists:JSON.stringify(this.lists),subjects:JSON.stringify(this.subjects)}});
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.practiceComDiff{
		width: 100%;
		height: 100%;
	}
	.practiceDiff .top{
		display: flex;
		margin: 0 .2rem;
		padding-top: .3rem;
	}
	.practiceDiff .top div:first-child{
		flex: 1;
	}
	.practiceDiff .top div:nth-child(2){
		flex: 3;
		text-align: center;
	}
	.practiceDiff .top div:last-child{
		flex: 1;
		text-align: right;
	}
	.practiceDiff .top div .back{
		display: inline-block;
		width: .21rem;
		height: .43rem;
		background: url(../../assets/images/public/back.png) no-repeat left top;
		background-size: 100%;
	}
	.practiceDiff .top div .icon_01{
		display: inline-block;
		width: .44rem;
		height: .44rem;
		background: url(../../assets/images/home/icon_01.png) no-repeat left top;
		background-size: 100%;
	}
	.practiceDiff .top div p{
		font-size: .24rem;
		display: inline-block;
		width: .96rem;
		height: .45rem;
		background-color: #eee;
		border-radius: .1rem;
		line-height: .46rem;
		text-align: center;
		margin-left: 1rem;
		vertical-align: middle;
		margin-top: .06rem;
		position: relative;
	}
	.practiceDiff .top div p .icon_02{
		display: inline-block;
		width: .29rem;
		height: .26rem;
		background: url(../../assets/images/public/tip.png) no-repeat left top;
		background-size: 100%;
		position: absolute;
		top: -.1rem;
		right: 0;
	}
	.practiceDiff .top div span{
		display: inline-block;
		width: .41rem;
		height: .41rem;
		background: url(../../assets/images/public/star.png) no-repeat left top;
		background-size: 100%;
	}
	.practiceDiff .top div span.active{
		background: url(../../assets/images/public/star_active.png) no-repeat left top;
		background-size: 100%;
	}
	.practiceDiff .questions{
		width: 6.3rem;
		margin: 0 auto;
		font-size: .3rem;
	}
	.practiceDiff .questions .title{
		font-weight: bold;
		padding: .6rem 0 1rem 0;
	}
	.practiceDiff .questions ul li{
		background-color: #eee;
		border-radius: .06rem;
		margin-bottom: .2rem;
		padding: .4rem;
		box-sizing: border-box;
		position: relative;
	}
	.practiceDiff .questions ul li i{
		display: inline-block;
		width: .52rem;
		height: .35rem;
		background: url(../../assets/images/public/right.png) no-repeat left top;
		background-size: 100%;
		position: absolute;
		left: .3rem;
		top: .4rem;
	}
	.practiceDiff .questions ul li span{
		display: inline-block;
		width: .36rem;
		height: .36rem;
		background: url(../../assets/images/public/wrong.png) no-repeat left top;
		background-size: 100%;
		position: absolute;
		left: .3rem;
		top: .4rem;
	}
	.practiceDiff .questions .analys{
		text-align: right;
		font-size: .24rem;
		margin-top: .88rem;
	}
	.practiceDiff .questions .analys span{
		display: inline-block;
		width: 1.37rem;
		height: .64rem;
		line-height: .64rem;
		background-color: #eee;
		border-radius: .1rem;
		text-align: center;
		position: relative;
	}
	.practiceDiff .questions .analys span i{
		display: inline-block;
		width: .29rem;
		height: .26rem;
		background: url(../../assets/images/public/tip.png) no-repeat left top;
		background-size: 100%;
		position: absolute;
		top: -.1rem;
		right: 0;
	}
	.practiceDiff .questions .thinking{
		width: 6.18rem;
		margin: 0 auto;
		margin-top: .88rem;
		font-size: .28rem;
	}
	.practiceDiff .questions .thinking .tit{
		text-align: center;
		font-size: .3rem;
		margin-bottom: .6rem;
		position: relative;
	}
	.practiceDiff .questions .thinking .tit i{
		display: inline-block;
		width: .29rem;
		height: .26rem;
		background: url(../../assets/images/public/tip.png) no-repeat left top;
		background-size: 100%;
		position: absolute;
		top: -.1rem;
		right: 2.3rem;
	}
	.practiceDiff .questions .thinking .content p{
		padding-bottom: .1rem;
	}
	/* 弹框 */
	.practiceComDiff .hand_in{
		font-size: .3rem;
		color: #000;
		width: 5.43rem;
		height: 3.34rem;
		background: #fff;
	}
	.practiceComDiff .hand_in p{
		text-align: center;
		height: 1.97rem;
		line-height: 1.97rem;
		border-bottom: 1px solid #eee;
	}
	.practiceComDiff .hand_in ul{
		display: flex;
	}
	.practiceComDiff .hand_in ul li{
		flex: 1;
		text-align: center;
		height: 1.37rem;
		line-height: 1.37rem;
	}
	.practiceComDiff .hand_in ul li:first-child{
		border-right: 1px solid #eee;
	}
</style>
