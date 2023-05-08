<template>
  <el-container id="app">
    <el-header>
      <Navigator/>
    </el-header>
    <el-aside></el-aside>
    <el-main>
      <router-view/>
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<script>
import Navigator from '@/components/Navigator.vue'

export default {
  name: 'App',
  components: {
    Navigator
  },
  data() {
    return {
      
    }
  },
  methods:{

  }
}
</script>

<style>
</style>
