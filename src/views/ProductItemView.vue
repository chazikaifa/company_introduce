<template>
  <div class="product_item">
    <Title :isMobile="isMobile" :img="item ? item.img : null" :text="item ? item.name : null" contain></Title>
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
import {httpGet} from '@/utils/http'
import Title from '@/components/Title.vue'
import { Loading } from 'element-ui';
import mammoth from 'mammoth'

export default {  
  name: 'ProductItemView',
  props: {
    isMobile: Boolean
  },
  components: {
    Title,
  },
  data() {
    return {
      item: {
        name: '产品名称',
        img: null,
        description: null,
        type: null,
      },
      showSkeleton: true,
      loading: null
    }
  },
  created() {
    this.$router.onReady(()=>{
      let index = parseInt(this.$route.params.id) - 1
      this.item.name = this.$t(`product.list[${index}].name`)
      this.item.img = `product.list[${index}].img`
      const filePath = this.$t(`product.list[${index}].description`).toString();
      
    if(filePath.match(/.*\.(htm(l?)|(docx))$/)) {
      this.loading = Loading.service({ fullscreen: true});

      httpGet(filePath).then(res => {
        if(res.status === 200) {
          if(filePath.match(/.*\.htm(l?)/)) {
            this.item.content = res.data;
            this.showSkeleton = false;
            this.loading.close();
          } else if((filePath.match(/.*\.docx$/))){
            this.getWordText(filePath)
          }
        } else {
          this.$message.error(res.statusText)
          this.showSkeleton = false;
          this.loading.close();
          this.loading = null;
        }
      })
    } else {
      this.item.content = filePath;
      this.showSkeleton = false;
    }
      
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
    },
    getWordText(filePath) {
      const xhr = new XMLHttpRequest();
      xhr.open('get',filePath, true);
      xhr.responseType = 'arraybuffer';
      xhr.onload = () => {
        if(xhr.status === 200) {
          mammoth.convertToHtml({arrayBuffer: new Uint8Array(xhr.response)}).then(
            resHtml => {
              this.item.content = resHtml.value
              this.showSkeleton = false;
            this.loading.close();
            }
          )
        } else {
          this.showSkeleton = false;
          this.loading.close();
        }
      }
      xhr.send()
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