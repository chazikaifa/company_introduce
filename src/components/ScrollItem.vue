<template>
  <div class="scroll_item" :mobile="isMobile" :style="style" :type="type">
  	<div class="title">{{title}}</div>
  	<el-divider></el-divider>
  	<div class="content" v-html="content"></div>
  </div>
</template>

<script>

export default {	
	name: 'ScrollItem',
	props: {
		isMobile: Boolean,
		type: String,
		title: String,
		text: String,
		img: String
	},
	components: {
	},
	data() {
		return {
			picture: null,
			content: '',
			style: ''
		}
	},
	watch: {
    text: {
      handler: function (val, oldVal) {
        if(val) {
					let praghs = val.split('\n');
					this.content = '';
					for(let pragh of praghs) {
						this.content =  ` ${this.content} <p> ${pragh} </p> `
					}
				}
      },
      immediate: true
    },
    img: {
      handler: function (val, oldVal) {
      	if(val) {
					try {
						this.picture = require('../assets/' + val);
						this.style = 'background-image: url(' + this.picture + ')'
					} catch (err) {
						console.log(`[ScrollItem-${this.title}] Cannot find img ${val}`)
					}
				}
      },
      immediate: true
    },
  }
}
</script>

<style scoped>
.scroll_item {
	height: auto;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	padding: 20px 0;
	margin: 12px 0;
	background-size: cover;
}
.scroll_item[type=image] {
	height: 500px;
	justify-content: center;
}
.scroll_item[type=mixed] {
	height: 500px;
}
.scroll_item .title {
	margin: 0 auto;
	font-size: 34px;
	color: #595959;
	font-weight: 300;
}
.scroll_item .el-divider {
	width: 120px;
	margin: 12px;
	height: 2px;
	background-color: #409EFF;
}
.scroll_item .content {
	margin: 48px;
	font-size: 14px;
	color: #595959;
}
.scroll_item[mobile] .content {
	margin: 24px;
}

</style>