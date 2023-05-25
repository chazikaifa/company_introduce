<template>
  <el-carousel 
    :height="isMobile? '800px' :'100%'"
    trigger = "click"
    class="home">
    <el-carousel-item  
    	class="item" v-for="item in carousel_list" 
    	:style="'background-image: url(' + item.img + ')'"
    	:key="item.text">
  		<div class="item_text" :mobile="isMobile">{{$t(item.text)}}</div>
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
  				img: require('../assets/index1.jpg'),
  				text:'index.card1',
  			},
  			{
  				img: require('../assets/index2.jpg'),
  				text:'index.card2'
  			},
  			{
  				img: require('../assets/index3.jpg'),
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
  overflow: hidden;
}
.item{
	background-size: cover;
	display: flex;
	justify-content: center;
	align-items: center;
  opacity: 0.80;
}
.item_text{
	color: #FFF;
	font-size: 56px;
  mix-blend-mode: difference;
}
.item_text[mobile] {
  font-size: 38px
}
</style>
