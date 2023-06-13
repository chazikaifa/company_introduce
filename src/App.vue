<template>
  <el-container id="app">
    <el-header id="nav" height="70px">
      <Navigator :isMobile="isMobile"/>
    </el-header>
    <el-main id="main_view">
      <router-view :isMobile="isMobile"/>
      <el-backtop target=".el-main" :bottom="100"></el-backtop>
    </el-main>
    <el-footer id="website_info" height="50px">
      <WebsiteInfo :isMobile="isMobile"/>
    </el-footer>
  </el-container>
</template>

<script>
import { httpGet } from '@/utils/http'
import Navigator from '@/components/Navigator.vue'
import WebsiteInfo from '@/components/WebsiteInfo.vue'
import { Loading } from 'element-ui';

export default {
  name: 'App',
  components: {
    Navigator,
    WebsiteInfo
  },
  mounted() {
    this.loading = Loading.service({ fullscreen: true});

    this.screenWidth = document.body.clientWidth
    window.onresize = () => {
      return (() => {
        this.screenWidth = document.body.clientWidth
      })()
    };

    httpGet('/res/lang/zh.json').then((res) => {
      this.$i18n.mergeLocaleMessage('zh', res.data);
      httpGet('/res/lang/en.json').then((res) => {
        this.$i18n.mergeLocaleMessage('en', res.data);
        document.title = this.$t('title.company_name');
        this.loading.close();
      }).catch((err) => {
        this.$message.error(err)
      })
    }).catch((err) => {
      this.$message.error(err)
    })

    
  },
  data() {
    return {
      screenWidth: null,
      isMobile: false,
      loading: true
    }
  },
  methods:{

  },
  watch: {
    screenWidth: {
      handler: function (val, oldVal) {
        if (val < 900) {
          this.isMobile = true
        } else {
          this.isMobile = false
        }
      },
      immediate: true
    },
  }
}
</script>

<style>
body {
  margin: 0;
}
#app{
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  overflow-y: auto;
}
#nav{
  background: #EAEAEA;
  padding: 5px 10px;
}
#mobile_nav{
  height: -webkit-fill-available;
  background: #FFF;
}
#main_view {
  padding: 0;
  overflow-x: hidden;
  overflow-y: auto;
}
#website_info{
  border-top: 1px #EAEAEA solid;
  padding: 0 5px 0 0;
}
p {
  word-break:break-all;
}
</style>
