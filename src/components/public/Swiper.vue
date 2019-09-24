<template>
  <div class="swiper">
    <swiper :options="swiperOption" class="swiper">
		<swiper-slide class="text">
			<slot></slot>
		</swiper-slide>
    </swiper>
  </div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	import 'swiper/dist/css/swiper.css'
	
export default {
  name: '',
  data () {
    return {
      swiperOption: {
		direction: 'vertical',
		slidesPerView: 'auto',
		freeMode: true,
		setWrapperSize: true,
		// mousewheel:true,
		}
    }
	},
	components: {
		swiper,
		swiperSlide
	}
}
</script>


<style scoped>
	.swiper{
		width: 100%;
		height: 100%;
	}
	.swiper-wrapper{
		width: 100%;
	}
	.text{
		width: 100%;
		height: auto;
	}
	.text .swiper-container{
		width: 100%;
	}

</style>
