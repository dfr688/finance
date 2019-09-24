<template>
  <div class="orderPractice">
		<!-- <Swiper> -->
			<HeaderTop title="顺序练习"/>
			<mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="false">
				<Lists :practiceLists="practiceLists"/>
				<div v-if="allLoaded" class="data-none">没有更多数据了</div>
				<div slot="top" class="mint-loadmore-top" style="text-align:center">
					<span class="release" v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">释放加载</span>
					<span class="release" v-show="topStatus === 'loading'">加载中...</span>
				</div>
			</mt-loadmore>
		<!-- </Swiper> -->
  </div>
</template>

<script>
	// import Swiper from '../public/Swiper'
	import HeaderTop from '../public/HeaderTop'
	import Lists from '../public/Lists'
	
export default {
  name: '',
  data () {
    return {
      page: 1,
      allLoaded: false,
	  topStatus: "",
	  practiceLists: []
    }
  },
	components: {
		// Swiper,
		HeaderTop,
		Lists
	},
	methods: {
		// 获取列表
		getList(page) {
			let token = localStorage.getItem("token");
			this.baseJs.ajaxReq("/question/api/question/order",{pageSize: 10,pageNum:page},"get",token)
			.then(res => {
				// console.log(res);
				this.practiceLists = res.data.list;
			})
			.catch(err => {
				console.log(err);
			})
		},
		loadBottom() {
			this.page = this.page + 1;
			// 发送请求
			let token = localStorage.getItem("token");
			this.baseJs.ajaxReq("/question/api/question/order",{pageSize: 10,pageNum:this.page},"get",token)
			.then(res => {
				// console.log(res);
				if(this.page >= res.data.pages){
					this.allLoaded = true;
				}
				this.$refs.loadmore.onBottomLoaded();
				this.practiceLists = this.practiceLists.concat(res.data.list);
				// console.log(this.practiceLists);
			})
			.catch(err => {
				console.log(err);
			});
		},
		loadTop() {
			this.handleTopChange("loading");//下拉时 改变状态码
			this.getList(1);
			this.allLoaded = false;
			this.page = 1;
			setTimeout(() => {
		            this.handleTopChange("loadingEnd")//数据加载完毕 修改状态码
		            this.$refs.loadmore.onTopLoaded();
		        }, 800);
			// console.log(this.topStatus);
		},
		handleTopChange(status) {
		    this.topStatus = status;
		}
	},
	created() {
		this.getList(1);
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.orderPractice{
		height: 100%;
		overflow: auto;
		-webkit-overflow-scrolling: touch;
	}
</style>
