<template>
  <el-carousel 
    :height="isMobile? '800px' :'100%'"
    trigger = "click"
    class="home">
    <el-carousel-item  
      class="item" v-for="item in carousel_list" 
      :style="'background-image: url( ' + $t('server.host') + $t(item.img) + ')'"
      :key="item.text"
      @click.native="toProduct(item.id)">
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
  mounted() {
    this.maxTry = 10;
    this.asyncGetData();
  },
  beforeDestroy() {
    if(this.timer != null) {
      clearTimeout(this.timer)
    }
  },
  data() {
    return {
      carousel_list:[],
      maxTry: 10,
      interval: 200,
      timer: null
    }
  },
  methods: {
    processRawData: function() {
      this.carousel_list = []
      for(let i in this.$t("index.list")) {
        let temp = {
          id: parseInt(i) + 1,
          text: `index.list[${i}].text`,
          img: `index.list[${i}].img`
        };
        this.carousel_list.push(temp)
      }
    },
    asyncGetData: function() {
      if(this.timer != null) {
        clearTimeout(this.timer)
      }
      this.timer = null;
      if(typeof(this.$t("index.list")) == "string") {
        if(this.maxTry > 0) {
          this.maxTry--;
          this.timer = setTimeout(this.asyncGetData, this.interval);
        } else {
          this.$message.error(this.$t("index.error"))
        }
      } else {
        this.processRawData()
      }
    },
    toProduct: function(id) {
      let to = {
        name: 'productItem',
        params: {
          id: id
        }
      };
      this.$router.push(to);
    },
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
