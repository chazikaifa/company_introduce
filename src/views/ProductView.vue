<template>
  <div class="product">
    <Title :isMobile="isMobile" :img="'2.jpg'" :text="$t('navigator.products')"></Title>
    <div class="product_list">
    	<el-row v-if="!isMobile" v-for="product_row in product_list">
	    	<el-col :span="12" v-for="product in product_row">
	    		<el-card class="item_card" shadow="hover" @click.native="toProduct(product.id)">
	    			<div class="item_title">{{product.name}}</div>
	    			<div class="item_card_image" :style="'background-image: url(' + product.picture + ')'"></div>
	    		</el-card>
	    	</el-col>
	    </el-row>
	    <el-row v-if="isMobile">
	    	<el-col :span="24" v-for="product in products">
	    		<el-card class="item_card mobile" shadow="hover" @click.native="toProduct(product.id)">
	    			<div class="item_title">{{product.name}}</div>
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

const productDumpData = [];
productDumpData.splice(0);
for(let i = 0; i < 6; i++) {
	let temp = {};
	temp.id = i + 1;
	temp.name = `产品${temp.id}号`,
	temp.img = Math.ceil(Math.random() * 3) + '.jpg';
	productDumpData.push(temp);
}

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
			text: this.$t('product_item.loading'),
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
			this.products = [...productDumpData];
			for(let i in this.products) {
				this.products[i].picture = require('../assets/' + this.products[i].img)
			}
			this.solveProducts();
			this.loading.close();
		}, 500)
	},
	methods: {
		toProduct: function(id) {
			let to = {
				name: 'productItem',
				params: {
					id: id
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
	height: 260px;
}
.item_card .el-card__body {
	padding: 0;
}
.item_card_image {
	height: 200px;
	background-size: cover;
	background-color: #CCCCCC;
	opacity: 0.7;
}
.item_title {
	width: 100%;
	height: 60px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 26px;
	font-weight: bold;
	color: #333;
}
</style>