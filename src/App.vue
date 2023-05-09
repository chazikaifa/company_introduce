<template>
  <el-container id="app">
    <el-header id="nav" height="70px">
      <Navigator :isMobile="isMobile"/>
    </el-header>
    <el-main>
      <router-view :isMobile="isMobile"/>
    </el-main>
    <el-footer>
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
.el-footer{
  border-top: 1px #EAEAEA solid;
}
</style>
