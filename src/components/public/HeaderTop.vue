<template>
  <div class="headerTop">
		<div>{{ title }}</div>
		<i @click="goBack"></i>
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
		"title"
	],
	methods: {
		goBack() {
			this.$router.go(-1);
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.headerTop{
		text-align: center;
		font-size: .32rem;
		position: relative;
		padding: .6rem 0 .3rem 0;
	}
	.headerTop i{
		display: inline-block;
		width: .21rem;
		height: .43rem;
		background: url(../../assets/images/public/back.png) no-repeat left top;
		background-size: 100%;
		position: absolute;
		top: .6rem;
		left: .2rem;
	}
</style>
