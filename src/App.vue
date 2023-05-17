<template>
  <el-container id="app">
    <el-header id="nav" height="70px">
      <Navigator :isMobile="isMobile"/>
    </el-header>
    <el-main id="main_view">
      <router-view :isMobile="isMobile"/>
    </el-main>
    <el-footer id="website_info" height="50px">
      <WebsiteInfo :isMobile="isMobile"/>
    </el-footer>
  </el-container>
</template>

<script>
import Navigator from '@/components/Navigator.vue'
import WebsiteInfo from '@/components/WebsiteInfo.vue'

export default {
  name: 'App',
  components: {
    Navigator,
    WebsiteInfo
  },
  mounted() {
    this.screenWidth = document.body.clientWidth
    window.onresize = () => {
      return (() => {
        this.screenWidth = document.body.clientWidth
      })()
    }
  },
  data() {
    return {
      screenWidth: null,
      isMobile: false,
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
}
#website_info{
  border-top: 1px #EAEAEA solid;
  padding: 0 5px 0 0;
}
</style>
