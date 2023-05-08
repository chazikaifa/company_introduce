<template>
  <div class="container">
  	<el-row>
  		<el-col :span="2">
  			<img class="nav_logo" alt="Vue logo" src="../assets/logo.png">
  		</el-col>
  		<el-col :span="20"></el-col>
  		<el-col :span="2" class="language">
  			<el-button class="btn_language" type="text" @click="changeLan">{{$t("language.switch")}}</el-button>
  		</el-col>
  	</el-row>
  </div>
</template>

<script>
export default {
  name: 'Navigator',
  data() {
  	return {

  	}
  },
  methods: {
  	changeLan: function() {
  		this.changeLanguage()
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
}
.nav_logo{
	display: block;
	height: 100%;
}
.language{
	display: flex;
	justify-content: center;
	align-items: center;
}
.btn_language{
	width: 80%;
	margin: auto;
}
</style>