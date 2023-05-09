<template>
  <el-carousel height="100%" class="home">
    <el-carousel-item  
    	class="item" v-for="item in carousel_list" 
    	:style="'background-image: url(' + item.img + ')'"
    	:key="item.text" 
    	invertal="5000">
  		<div class="item_text" :style="isMobile ? 'font-size: 38px' : 'font-size: 56px'">{{$t(item.text)}}</div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: 'HomeView',
  props: {
  	isMobile: Boolean
  },
  components: {
  },
  data() {
  	return {
  		carousel_list:[
  			{
  				img: require('../assets/1.jpg'),
  				text:'index.card1',
  			},
  			{
  				img: require('../assets/2.jpg'),
  				text:'index.card2'
  			},
  			{
  				img: require('../assets/3.jpg'),
  				text:'index.card3'
  			},
  		]
  	}
  }
}
</script>

<style scoped="">
.home{
	width: 100%;
	height: 100%;
}
.item{
	background-size: cover;
	display: flex;
	justify-content: center;
	align-items: center;
}
.item_text{
	color: #FFF;
	font-size: 56px;
}
.item img{
	height: 100%;
	width: 100%;
}
</style>
