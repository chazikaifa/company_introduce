<template>
  <div class="product_item">
  	<Title :isMobile="isMobile" :img="item ? item.img : null" :text="item ? item.name : null"></Title>
  	<el-breadcrumb separator-class="el-icon-arrow-right" class="product_path">
		  <el-breadcrumb-item :to="{ path: '/product' }">{{$t('navigator.products')}}</el-breadcrumb-item>
		  <el-breadcrumb-item>{{item.name}}</el-breadcrumb-item>
		</el-breadcrumb>
  	<div class="content" v-html="item.content">
  		<el-skeleton :rows="6" v-show="showSkeleton"></el-skeleton>
  	</div>
  </div>
</template>

<script>		
import { httpGet } from '@/utils/http'
import Title from '@/components/Title.vue'

export default {	
	name: 'ProductItemView',
	props: {
		isMobile: Boolean
	},
	components: {
		Title
	},
	data() {
		return {
			item: {
				name: '产品名称',
				img: null,
				description: null
			},
			showSkeleton: true,
		}
	},
	created() {
		this.$router.onReady(()=>{
			let index = parseInt(this.$route.params.id) - 1
			this.item.name = this.$t(`product.list[${index}].name`)
			this.item.img = this.$t(`product.list[${index}].img`)
			this.item.content = this.solveDescription(this.$t(`product.list[${index}].description`))
			this.showSkeleton = false;
		})
	},
  methods: {
  	solveDescription: function(description) {
  		let praghs = description.split('\n');
				let content = '';
				for(let pragh of praghs) {
					content =  ` ${content} <p> ${pragh} </p> `
			}
			return content;	
  	}
  }
}
</script>

<style scoped>
.product_item .content {
	margin: 48px;
	font-size: 14px;
	color: #595959;
}
.product_item .product_path {
	margin: 48px;
}
</style>