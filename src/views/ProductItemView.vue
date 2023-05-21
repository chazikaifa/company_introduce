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

const dumpData = {
	img: '.jpg',
	name: '产品',
	description: '随便写点什么填充一下，到时候全部要替换掉的英文就不写了。随便写点什么填充一下，到时候全部要替换掉的英文就不写了。随便写点什么填充一下，到时候全部要替换掉的英文就不写了。随便写点什么填充一下，到时候全部要替换掉的英文就不写了。随便写点什么填充一下，到时候全部要替换掉的英文就不写了。随便写点什么填充一下，到时候全部要替换掉的英文就不写了。随便写点什么填充一下，到时候全部要替换掉的英文就不写了。随便写点什么填充一下，到时候全部要替换掉的英文就不写了。随便写点什么填充一下，到时候全部要替换掉的英文就不写了。随便写点什么填充一下，到时候全部要替换掉的英文就不写了。随便写点什么填充一下，到时候全部要替换掉的英文就不写了。随便写点什么填充一下，到时候全部要替换掉的英文就不写了。随便写点什么填充一下，到时候全部要替换掉的英文就不写了。\r\n随便写点什么填充一下，到时候全部要替换掉的英文就不写了。随便写点什么填充一下，到时候全部要替换掉的英文就不写了。随便写点什么填充一下，到时候全部要替换掉的英文就不写了。随便写点什么填充一下，到时候全部要替换掉的英文就不写了。随便写点什么填充一下，到时候全部要替换掉的英文就不写了。随便写点什么填充一下，到时候全部要替换掉的英文就不写了。随便写点什么填充一下，到时候全部要替换掉的英文就不写了。随便写点什么填充一下，到时候全部要替换掉的英文就不写了。随便写点什么填充一下，到时候全部要替换掉的英文就不写了。随便写点什么填充一下，到时候全部要替换掉的英文就不写了。随便写点什么填充一下，到时候全部要替换掉的英文就不写了。随便写点什么填充一下，到时候全部要替换掉的英文就不写了。随便写点什么填充一下，到时候全部要替换掉的英文就不写了。'
}

const dumpDataList = []
for(let i = 0; i < 6; i++){
	let temp = {}
	temp.img = Math.ceil(Math.random() * 3) + dumpData.img;
	temp.name = dumpData.name + (i + 1) + '号';
	temp.description = temp.name + ':' + dumpData.description
	dumpDataList.push(temp)
}

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
			loading: null,
			showSkeleton: true,
		}
	},
	created() {
		this.loading = this.$loading({
			lock: true,
			text: this.$t('product_item.loading'),
			spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
		})
		// this.$router.onReady(()=>{
		// 	httpGet('product/' + this.$route.params.id)
		// 		.then((res)=>{
		// 			console.log(res);
		//			this.loading = false;
		// 		})
		// 		.catch((err)=>{
		// 			console.log("[ProductItem]" + err)
		// 			this.$message.error(this.$t('product_item.httpFail'))
		// 		})
		// })
		this.$router.onReady(()=>{
			setTimeout(()=>{
				this.item = dumpDataList[parseInt(this.$route.params.id) - 1];
				this.item.content = this.solveDescription(this.item.description)
				this.loading.close();
				this.showSkeleton = false;
			}, 500)
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