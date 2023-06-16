<template>
  <div class="container">
    <el-row v-show="!isMobile">
      <el-col :span="4" class="logo_container">
        <img class="nav_logo" alt="Vue logo" :src="$t('server.host') + $t('title.logo')" @click="navSelect('1')">
      </el-col>
      <el-col :span="16">
        <el-menu class="nav_bar" :default-active="index" mode="horizontal" @select="navSelect">
          <!-- <el-menu-item index="1">{{$t("navigator.index")}}</el-menu-item> -->
          <el-menu-item index="2">{{$t("navigator.introduce")}}</el-menu-item>
          <el-menu-item index="3">{{$t("navigator.products")}}</el-menu-item>
          <el-menu-item index="4">{{$t("navigator.contact")}}</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="4" class="language">
        <el-button class="btn_language" type="text" @click="changeLan">{{$t("navigator.switch")}}</el-button>
      </el-col>
    </el-row>
    <el-row v-show="isMobile">
      <el-col class="mobile_btn_container" :span="6">
        <i class="el-icon-s-grid btn_menu" @click="changeOpen"></i>
      </el-col>
      <el-col :span="12" class="nav_mobile_logo_container"><img class="nav_logo" alt="Vue logo" :src="$t('server.host') + $t('title.logo')" @click="navSelect('1')"></el-col>
      <el-col :span="6" class="language">
        <el-button class="btn_language" type="text" @click="changeLan">{{$t("navigator.switch")}}</el-button>
      </el-col>
    </el-row>
    <transition name="el-zoom-in-top" :duration="1500">
      <el-menu key="mobile_nav" v-show="isMobile && isOpen" class="mobile_nav" :default-active="index" @select="navSelect">
        <!-- <el-menu-item index="1">{{$t("navigator.index")}}</el-menu-item> -->
        <el-menu-item index="2">{{$t("navigator.introduce")}}</el-menu-item>
        <el-menu-item index="3">{{$t("navigator.products")}}</el-menu-item>
        <el-menu-item index="4">{{$t("navigator.contact")}}</el-menu-item>
      </el-menu>
  </transition>
  </div>
</template>

<script>
export default {
  name: 'Navigator',
  props: {
    isMobile: Boolean
  },
  data() {
    return {
      index: '1',
      isOpen: false
    }
  },
  mounted() {
  },
  methods: {
    changeLan: function() {
      this.changeLanguage()
    },
    changeOpen: function() {
      this.isOpen = !this.isOpen;
    },
    navSelect: function(key) {
      this.isOpen = false;
      this.index = key;
      let to = {};
      switch(key) {
        //case '1':
        //  to.name = 'home';
        //  break;
        case '2':
          to.name = 'about'
          break;
        case '3':
          to.name = 'product'
          break;
        case '4':
          to.name = 'contact'
          break;
        default:
          to.name = 'home'
      }
      if(this.$route.name == to.name) return;
      this.$router.push(to);
    }
  },
  watch: {
    isMobile: {
      handler: function (val, oldVal) {
        if (!val) {
          this.isOpen = false
        }
      },
      immediate: true
    },
    $route: {
      handler: function (val, oldVal) {
        switch(val.name) {
          case 'about':
            this.index = '2';
            break;
          case 'product':
            this.index = '3';
            break;
          case 'contact':
            this.index = '4';
            break;
          default:
            this.index = '1';
            break;
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
.container {
  height: 100%;
}
.el-row {
  height: 100%;
}
.el-col {
  overflow: hidden;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.logo_container {
  justify-content: flex-start;
}
.nav_logo{
  display: block;
  height: 100%;
}
.nav_mobile_logo_container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.nav_bar{
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
}
.nav_bar .el-menu-item{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  font-size: 15px;
}
.language{
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.btn_language{
  margin-right: 5px;
}
.mobile_btn_container {
  justify-content: flex-start;
}
.btn_menu{
  font-size: 30px;
}
.mobile_nav {
  position: absolute;
  top: 70px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
}
</style>