<template>
  <div class="hand">
		<Swiper>
   <div class="top">
		 <i @click="goBack"></i>
		 <div class="percent">
			 {{ rate }}%
			 <span>正确率</span>
		 </div>
	 </div>
	 <div class="answer">
		 <div class="remark">
			 <span class="one"><i></i>答对</span><span class="two"><i></i>答错</span><span class="three"><i></i>未作答</span>
		 </div>
		 <ul>
			 <li v-for="(list,index) in lists" :key="list.id">
			 	<span :class="{right:bingo(list.id) === true,error:bingo(list.id) === false}">{{ index + 1 }}</span>
			 </li>
		 </ul>
		 <div class="again" @click="goAgain">
			 再次练习
		 </div>
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
        lists:[],
        subjects:[],
		rate: 0,
		listId:1,
    }
  },
  methods: {
	  goAgain() {
		  this.$router.push({name:"simpractice",params:{id:this.listId}});
	  },
	  goBack() {
		  this.$router.go(-1);
	  }
  },
	components: {
		Swiper
	},
	computed: {
		bingo(id) {
			return function(id){
				for(let i = 0;i<this.subjects.length;i++){
					if(this.subjects[i].id === id){
						return this.subjects[i].bingo;
					}
				}
			}
		}
	},
	created() {
		this.lists = JSON.parse(this.$route.query.lists);
		this.subjects = JSON.parse(this.$route.query.subjects);
		this.listId = this.$route.query.listId;
		//计算正确率
		let count = this.lists.length;//总题数
		let right = 0;//答对题数
		for(let i = 0;i<this.subjects.length;i++){
			if(this.subjects[i].bingo){
				right++;
			}
		}
		this.rate = (right/count) * 100;
		this.rate = this.rate.toFixed(0);
// 		console.log(this.lists);
// 		console.log(this.subjects);
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.hand{
		height: 100%;
	}
	.hand .top{
		width: 100%;
		height: 5.71rem;
		background: url(../../assets/images/home/bg1.png) no-repeat left top;
		background-size: 100%;
		position: relative;
		padding-top: 1.58rem;
		box-sizing: border-box;
	}
	.hand .top i{
		width: .21rem;
		height: .43rem;
		background: url(../../assets/images/home/rocket1.png) no-repeat left top;
		background-size: 100%;
		position: absolute;
		top: .66rem;
		left: .2rem;
	}
	.hand .top .percent{
		width: 2.8rem;
		height: 2.35rem;
		background: url(../../assets/images/home/percent.png) no-repeat left top;
		background-size: 100%;
		margin: 0 auto;
		font-size: .72rem;
		color: #fff;
		text-align: center;
		line-height: 2.35rem;
		position: relative;
	}
	.hand .top .percent span{
		font-size: .32rem;
		position: absolute;
		left: 50%;
    bottom: -1.17rem;
		margin-left: -.48rem;
	}
	.hand .answer{
		margin-top: .55rem;
		padding-top: .1rem;
		border-top: 1px solid #eee;
	}
	.hand .answer .remark{
		font-size: .22rem;
		text-align: right;
		margin: 0 .2rem;
	}
	.hand .answer .remark .two{
		margin: 0 .4rem;
	}
	.hand .answer .remark span i{
		display: inline-block;
		width: .39rem;
		height: .18rem;
		border-radius: .08rem;
		margin-right: .1rem;
	}
	.hand .answer .remark .one i{
		background-color: #64c769;
	}
	.hand .answer .remark .two i{
		background-color: #ff4c4c;
	}
	.hand .answer .remark .three i{
		background-color: #eee;
	}
	.hand .answer ul{
		display: flex;
		flex-wrap: wrap;
		border-bottom: 1px solid #eee;
	}
	.hand .answer ul li{
		width: 20%;
		text-align: center;
		font-size: .5rem;
		color: #fff;
		margin: .3rem 0;
	}
	.hand .answer ul li span{
		display: inline-block;
		width: .91rem;
		height: .91rem;
		line-height: .91rem;
		text-align: center;
		background: #eee;
		border-radius: .6rem;
	}
	.hand .answer ul li span.right{
		background: #64c769;
	}
	.hand .answer ul li span.error{
		background: #ff4c4c;
	}
	.hand .answer .again{
		font-size: .3rem;
		text-align: center;
		height: 1rem;
		line-height: 1rem;
	}
</style>
