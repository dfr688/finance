<template>
  <div class="lists">
  	<ul>
  		<li v-for="(item,index) in practiceLists" :key="item.id">
  			<div class="left">
  				<i></i>
  			</div>
  			<div class="right">
  				<router-link :to="{name:'questiondetail',params:{id:item.id}}">
  					<span>{{ item.title }}</span>
  					<div>
  						<i></i>
  					</div>
  				</router-link>
  			</div>
  		</li>
  	</ul>
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
	  "practiceLists"
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.lists ul li{
		display: flex;
		font-size: .3rem;
		margin-right: .3rem;
		margin-top: .36rem;
	}
	.lists ul li .left{
		flex: 1;
		text-align: center;
	}
	.lists ul li .left i{
		display: inline-block;
		width: .39rem;
		height: .45rem;
		background: url(../../assets/images/public/sign.png) no-repeat left top;
		background-size: 100%;
	}
	.lists ul li .right{
		flex: 4;
		padding-bottom: .32rem;
		border-bottom: 1px solid #f1f1f1;
	}
	.lists ul li .right a{
		display: flex;
		color: #333;
	}
	.lists ul li .right a span{
		display: inline-block;
		width: 5.2rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.lists ul li .right a div{
		flex: 1;
		text-align: right;
	}
	.lists ul li .right a div i{
		display: inline-block;
		width: .13rem;
		height: .24rem;
		background: url(../../assets/images/home/rocket.png) no-repeat left top;
		background-size: 100%;
		margin-bottom: -.05rem;
	}
</style>
