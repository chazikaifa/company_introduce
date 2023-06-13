<template>
  <div class="about">
    <Title :isMobile="isMobile" img="introduce.banner_img" :text="$t('navigator.introduce')"></Title>
    <ScrollItem 
    	v-for="item in items" 
    	:isMobile="isMobile" 
    	:title="$t(item.title)" 
    	:text="$t(item.text)" 
    	:img="$t(item.img)"
    	:type="$t(item.type)"/>
  </div>
</template>

<script>
import Title from '@/components/Title.vue'		
import ScrollItem from '@/components/ScrollItem.vue'

export default {	
	name: 'AboutView',
	props: {
		isMobile: Boolean
	},
	components: {
		Title,
		ScrollItem
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
			items: [],
			maxTry: 10,
      interval: 200,
      timer: null
		}
	},
	methods: {
		processRawData: function() {
      this.items = []
      for(let i in this.$t("introduce.list")) {
        let temp = {
        	title: `introduce.list[${i}].title`,
          text: `introduce.list[${i}].text`,
          img: `introduce.list[${i}].img`,
          type: `introduce.list[${i}].type`,
        };
        this.items.push(temp)
      }
    },
    asyncGetData: function() {
      if(this.timer != null) {
        clearTimeout(this.timer)
      }
      this.timer = null;
      if(typeof(this.$t("introduce.list")) == "string") {
        if(this.maxTry > 0) {
          this.maxTry--;
          this.timer = setTimeout(this.asyncGetData, this.interval);
        } else {
          this.$message.error(this.$t("introduce.error"))
        }
      } else {
        this.processRawData()
      }
    },
	}
}
</script>

<style>
	
</style>