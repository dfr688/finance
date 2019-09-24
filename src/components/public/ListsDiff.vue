<template>
  <div class="listDiff">
		 <div class="lists">
			<ul>
				<li v-for="(item,index) in paperLists" :key="item.id">
					<div class="left">
						<i></i>
					</div>
					<div class="right">
						<router-link :to="{name: 'simpractice',params:{id:item.id}}">
							<span>{{ item.title }}</span>
							<div>
								<i></i>
							</div>
						</router-link>
					</div>
				</li>
			</ul>
		 </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      
    }
  },
  props: [
	  "paperLists"
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.listDiff .lists ul li{
		display: flex;
		font-size: .3rem;
		margin-right: .3rem;
		margin-top: .4rem;
	}
	.listDiff .lists ul li .left{
		flex: 1;
		text-align: center;
	}
	.listDiff .lists ul li .left i{
		display: inline-block;
		width: .39rem;
		height: .45rem;
		background: url(../../assets/images/public/sign.png) no-repeat left top;
		background-size: 100%;
	}
	.listDiff .lists ul li .right{
		flex: 4;
		padding-bottom: .4rem;
		border-bottom: 1px solid #f1f1f1;
	}
	.listDiff .lists ul li .right a{
		display: flex;
		color: #333;
	}
	.listDiff .lists ul li .right a span{
		display: inline-block;
		width: 5.2rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.listDiff .lists ul li .right a div{
		flex: 1;
		text-align: right;
	}
	.listDiff .lists ul li .right a div i{
		display: inline-block;
		width: .13rem;
		height: .24rem;
		background: url(../../assets/images/home/rocket.png) no-repeat left top;
		background-size: 100%;
		margin-bottom: -.05rem;
	}
</style>
