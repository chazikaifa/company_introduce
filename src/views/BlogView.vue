<template>
  <div class="blog">
    <Title :isMobile="isMobile" img="blog.banner_img" :text="$t('navigator.blogs')"></Title>
    <div class="blog_list">
      <el-row v-if="!isMobile" v-for="blog_row in blog_list">
        <el-col :span="12" v-for="blog in blog_row">
          <el-card class="item_card" shadow="hover" @click.native="toBlog(blog.id)">
            <div class="item_title" slot="header">{{$t(blog.name)}}</div>
            <div class="item_card_image" :style="'background-image: -webkit-cross-fade(var(--transparent), url(' + $t('server.host') + $t(blog.img) + '), 60%'">
              <pre>{{ $t(blog.introduction) }}</pre>
            </div>
          </el-card>
        </el-col>

      </el-row>
      <el-row v-if="isMobile">
        <el-col :span="24" v-for="blog in blogs">
          <el-card class="item_card mobile" shadow="hover" @click.native="toBlog(blog.id)">
            <div class="item_title" slot="header">{{$t(blog.name)}}</div>
            <div class="item_card_image" :style="'background-image: -webkit-cross-fade(var(--transparent), url(' + $t('server.host') + $t(blog.img) + '), 60%'">
              <pre>{{ $t(blog.introduction) }}</pre>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Title from '@/components/Title.vue'

export default {  
  name: 'BlogView',
  props: {
    isMobile: Boolean
  },
  components: {
    Title,
  },
  data() {
    return {
      blogs: [],
      blog_list: [],
      maxTry: 10,
      interval: 200,
      timer: null
    }
  },
  created() {
    this.asyncGetData();
  },
  methods: {
    toBlog: function(id) {
      let to = {
        name: 'blogItem',
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
      if(typeof(this.$t("blog.list")) == "string") {
        if(this.maxTry > 0) {
          this.maxTry--;
          this.timer = setTimeout(this.asyncGetData, this.interval);
        } else {
          this.$message.error(this.$t("blog.error"))
        }
      } else {
        this.solveBlogs()
      }
    },
    solveBlogs: function() {
      this.blog_list = [];
      this.blogs = [];

      for(let i in this.$t("blog.list")) {
        let temp = {
          id: `blog.list[${i}].id`,
          name: `blog.list[${i}].name`,
          img: `blog.list[${i}].img`,
          introduction: `blog.list[${i}].introduction`,
          description: `blog.list[${i}].description`,
        };
        this.blogs.push(temp);
        
        if(parseInt(i) % 2 == 0) {
          this.blog_list.push([temp]);
        } else {
          this.blog_list[this.blog_list.length - 1].push(temp);
        }
      }
    }
  }
}
</script>

<style>
.blog_list {
  margin: 24px;
  .el-row {
    max-width: 1296px;
    margin: 0 auto;
  }
}
.item_card{
  margin: 12px;
  cursor: pointer;
  
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
  --transparent: url(data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==);
  pre {
    font-size: 14px;
    font-family: 'sans-serif';
    margin: 0;
    padding: 24px;
    line-height: 28px;
  }
}
.item_title {
  font-size: 26px;
  font-weight: bold;
  color: #333;
}
</style>