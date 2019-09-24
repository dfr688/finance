<template>
  <div class="card">
		<Swiper>
		<div class="top">
			<i class="back" @click="goBack"></i>
			<span class="one"><i></i>已作答</span><span class="two"><i></i>未作答</span>
		</div>
		<ul>
			<li v-for="(list,index) in lists" :key="list.id">
				<span :class="{active:isAns(list.id)}" @click="goQuestion(index)">{{ index + 1 }}</span>
			</li>
		</ul>
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
	  listId: 1,
    }
  },
	components: {
		Swiper
	},
	computed: {
		isAns(id) {
			return function(id){
				for(let i = 0;i<this.subjects.length;i++){
					if(this.subjects[i].id === id){
						return true;
					}
				}
				return false;
			}
		},
	},
	methods: {
		goQuestion(qid){
			this.$router.push({name:"simpractice",params:{id:this.listId,qid:qid,subjects:this.subjects}});
		},
		goBack() {
			this.$router.go(-1);
		}
	},
	created() {
		this.lists = JSON.parse(this.$route.query.lists);
		this.subjects = JSON.parse(this.$route.query.subjects);
		this.listId = this.$route.query.listId;
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.card{
		height: 100%;
	}
	.card .top{
		position: relative;
		font-size: .22rem;
		text-align: right;
		padding-top: .66rem;
		margin-right: .2rem;
	}
	.card .top .back{
		position: absolute;
		top: .66rem;
		left: .2rem;
		width: .21rem;
		height: .43rem;
		background: url(../../assets/images/public/back.png) no-repeat left top;
		background-size: 100%;
	}
	.card .top .one{
		margin-right: .3rem;
	}
	.card .top span i{
		display: inline-block;
		width: .39rem;
		height: .18rem;
		margin-right: .1rem;
		border-radius: .08rem;
	}
	.card .top .one i{
		background: #ffb13d;
	}
	.card .top .two i{
		background: #eee;
	}
	.card ul{
		display: flex;
		flex-wrap: wrap;
	}
	.card ul li{
		width: 20%;
		text-align: center;
		color: #fff;
		font-size: .5rem;
		margin: .5rem 0 .2rem 0;
	}
	.card ul li span{
		display: inline-block;
		width: .91rem;
		height: .91rem;
		text-align: center;
		line-height: .91rem;
		background: #eee;
		border-radius: .6rem;
	}
	.card ul li span.active{
		background: #ffb13d;
	}
</style>
