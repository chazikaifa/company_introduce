<template>
	<div class="footer_container">
		<el-row v-if="!isMobile">
			<el-col class="footer_item_horizontal footer_logo" :span="16">
				<img class="logo" alt="Vue logo" src="../assets/logo.png">
				<div class="footer_text">{{$t("footer.company_name")}}</div>
			</el-col>
			<el-col class="footer_item_horizontal footer_icp" :span="8">
				<div class="footer_text">{{$t("footer.icp")}}</div>
			</el-col>
		</el-row>
		<el-row v-else>
			<el-col class="footer_item_horizontal" :span="24">
				<div class="footer_text">{{$t("footer.company_name")}}</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
export default {
  name: 'WebsiteInfo',
  props:{
  	isMobile: Boolean
  }
}
</script>

<style scoped>
.footer_container{
	display: flex;
	height: 100%;
	width: 100%;
}
.el-row{
	height: 100%;
	width: 100%;
}
.footer_item_horizontal{
	height: 100%;
	display: flex;
	align-items: center;
}
.footer_logo{
	justify-content: flex-start;
}
.footer_icp{
	justify-content: flex-end;
}
.logo{
	display: block;
	height: 70%;
	margin: 0 0 0 12px;
}
.footer_text{
	font-size: 14px;
	color: #999999;
	margin-left: 12px;
}
</style>