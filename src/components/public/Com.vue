<template>
  <div class="com">
		<div class="bg">
			<i @click="goBack"></i>
			<div class="sign"></div>
		</div>
		<slot></slot>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      
    }
  },
  methods: {
	  goBack() {
		  this.$router.go(-1);
	  }
  }
}
</script>


<style scoped>
	.com .bg{
		width: 100%;
		height: 6.68rem;
		background: url(../../assets/images/public/bg.png) no-repeat left top;
		background-size: 100%;
	}
	.com .bg i{
		display: inline-block;
		width: .21rem;
		height: .43rem;
		background: url(../../assets/images/public/white_back.png) no-repeat left top;
		background-size: 100%;
		margin-left: .2rem;
	}
	.com .bg .sign{
		width: 1.44rem;
		height: 1.44rem;
		background: #fff;
		border-radius: 1rem;
		margin: 0 auto;
		margin-top: .3rem;
	}
</style>
