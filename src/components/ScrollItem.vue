<template>
  <div class="scroll_item" :mobile="isMobile" :style="'background-image: url(' + GD.server.host + $t(img) + ')'" :type="type">
  	<div class="title" >{{title}}</div>
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
			content: '',
		}
	},
	created(){},
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
	isolation: isolate;
	background-color: #FFF;
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
	color: #959595;
	font-weight: 300;
	mix-blend-mode: difference;
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
	color: #959595;
	mix-blend-mode: difference;
}
.scroll_item[mobile] .content {
	margin: 24px;
}

</style>