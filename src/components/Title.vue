<template>
	<div 
		:class="isMobile? 'banner_title mobile' : 'banner_title'"
		:style="'background-image: url(' + picture + ')'">
		<div class="banner_text">{{text}}</div>
		<span></span>
	</div>
</template>

<script>
export default {
	name: 'Title',
	props: {
		isMobile: Boolean,
		img: String,
		text: String
	},
	mounted() {
	},
	data() {
		return {
			picture: null
		}
	},
	watch: {
    img: {
      handler: function (val, oldVal) {
        if(val) {
					try {
						this.picture = require('../assets/' + val);
					} catch (err) {
						console.log(`[Title-${this.text}] Cannot find img ${val}`)
					}
				}
      },
      immediate: true
    },
  }

}
</script>

<style>
.banner_title{
	height: 400px;
	background-size: cover;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	padding-left: 40px;
	flex-direction: column;
	background-color: #CCCCCC;
}
.banner_title .banner_text {
	font-size: 30px;
	color: #FFF;
}
.banner_title.mobile {
	height: 250px;
	padding-left: 25px;
}
.banner_title.mobile .banner_text{
	font-size: 25px;
}
.banner_title span{
	display: block;
	height: 2px;
	width: 90px;
	background-color: #409EFF;
	margin-top: 8px;
}
</style>