<template>
  <div class="product">
    <Title :isMobile="isMobile" :img="'2.jpg'" :text="$t('navigator.products')"></Title>
  </div>
</template>

<script>
import Title from '@/components/Title.vue'		

export default {	
	name: 'ProductView',
	props: {
		isMobile: Boolean
	},
	components: {
		Title,
	},
	data() {
		return {}
	}
}
</script>

<style>
	
</style>