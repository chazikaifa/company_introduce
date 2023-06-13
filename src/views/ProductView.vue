<template>
  <div class="product">
    <Title :isMobile="isMobile" img="product.banner_img" :text="$t('navigator.products')"></Title>
    <div class="product_list">
    	<el-row v-if="!isMobile" v-for="product_row in product_list">
	    	<el-col :span="12" v-for="product in product_row">
	    		<el-card class="item_card" shadow="hover" @click.native="toProduct(product.id)">
	    			<div class="item_title" slot="header">{{$t(product.name)}}</div>
	    			<div class="item_card_image" :style="'background-image: url(' + GD.server.host + $t(product.img) + ')'"></div>
	    		</el-card>
	    	</el-col>
	    </el-row>
	    <el-row v-if="isMobile">
	    	<el-col :span="24" v-for="product in products">
	    		<el-card class="item_card mobile" shadow="hover" @click.native="toProduct(product.id)">
	    			<div class="item_title" slot="header">{{$t(product.name)}}</div>
	    			<div class="item_card_image" :style="'background-image: url(' + GD.server.host + $t(product.img) + ')'"></div>
	    		</el-card>
	    	</el-col>
	    </el-row>
    </div>
  </div>
</template>

<script>
import Title from '@/components/Title.vue'

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
			maxTry: 10,
      interval: 200,
      timer: null
		}
	},
	created() {
		this.asyncGetData();
	},
	methods: {
		toProduct: function(id) {
			let to = {
				name: 'productItem',
				params: {
					id: this.$t(id)
				}
			};
			this.$router.push(to);
		},
		asyncGetData: function() {
      if(this.timer != null) {
        clearTimeout(this.timer)
      }
      this.timer = null;
      if(typeof(this.$t("product.list")) == "string") {
        if(this.maxTry > 0) {
          this.maxTry--;
          this.timer = setTimeout(this.asyncGetData, this.interval);
        } else {
          this.$message.error(this.$t("product.error"))
        }
      } else {
        this.solveProducts()
      }
    },
		solveProducts: function() {
			this.product_list = [];
			this.products = [];

			for(let i in this.$t("product.list")) {
        let temp = {
        	id: `product.list[${i}].id`,
          name: `product.list[${i}].name`,
          img: `product.list[${i}].img`,
          description: `product.list[${i}].description`,
        };
        this.products.push(temp);
        
        if(parseInt(i) % 2 == 0) {
					this.product_list.push([temp]);
				} else {
					this.product_list[this.product_list.length - 1].push(temp);
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