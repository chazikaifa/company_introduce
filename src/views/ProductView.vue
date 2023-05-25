<template>
  <div class="product">
    <Title :isMobile="isMobile" :img="'banner_product.jpg'" :text="$t('navigator.products')"></Title>
    <div class="product_list">
    	<el-row v-if="!isMobile" v-for="product_row in product_list">
	    	<el-col :span="12" v-for="product in product_row">
	    		<el-card class="item_card" shadow="hover" @click.native="toProduct(product)">
	    			<div class="item_title" slot="header">{{product.name}}</div>
	    			<div class="item_card_image" :style="'background-image: url(' + product.picture + ')'"></div>
	    		</el-card>
	    	</el-col>
	    </el-row>
	    <el-row v-if="isMobile">
	    	<el-col :span="24" v-for="product in products">
	    		<el-card class="item_card mobile" shadow="hover" @click.native="toProduct(product)">
	    			<div class="item_title" slot="header">{{product.name}}</div>
	    			<div class="item_card_image" :style="'background-image: url(' + product.picture + ')'"></div>
	    		</el-card>
	    	</el-col>
	    </el-row>
    </div>
  </div>
</template>

<script>
import Title from '@/components/Title.vue'		
import { httpGet } from '@/utils/http'
import { getDumpProducts } from '@/utils/dumpData'

export default {	
	name: 'ProductView',
	props: {
		isMobile: Boolean
	},
	components: {
		Title,
	},
	data() {
		return {
			products: [],
			product_list: [],
			loading: null,
		}
	},
	created() {
		this.loading = this.$loading({
			lock: true,
			text: this.$t('product.loading'),
			spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
		})
		// httpGet('products/')
		// 	.then((res)=>{
		// 		console.log(res);
		// 		this.loading = false;
		// 	})
		// 	.catch((err)=>{
		// 		console.log("[Products]" + err)
		// 		this.$message.error(this.$t('product.httpFail'))
		// 	})
		setTimeout(()=>{
			this.products = [...getDumpProducts(6)];
			for(let i in this.products) {
				this.products[i].picture = require('../assets/' + this.products[i].img)
			}
			this.solveProducts();
			this.loading.close();
		}, 300)
	},
	methods: {
		toProduct: function(product) {
			let to = {
				name: 'productItem',
				params: {
					product: product
				}
			};
			this.$router.push(to);
		},
		solveProducts: function() {
			this.product_list = [];
			for(let i = 0; i < this.products.length; i++) {
				if(i % 2 == 0) {
					this.product_list.push([this.products[i]])
				} else {
					this.product_list[this.product_list.length - 1].push(this.products[i])
				}
			}
		}
	}
}
</script>

<style>
.product_list {
	margin: 24px;
}
.item_card{
	margin: 12px;
}
.item_card .el-card__body {
	padding: 0;
}
.item_card_image {
	width: 100%;
	height: 0;
	padding-bottom: 56.25%;
	background-size: cover;
	background-color: #CCCCCC;
	opacity: 0.7;
}
.item_title {
	font-size: 26px;
	font-weight: bold;
	color: #333;
}
</style>