<template>
  <div class="contact">
    <Title :isMobile="isMobile" :img="'3.jpg'" :text="$t('navigator.contact')"></Title>
  </div>
</template>

<script>
import Title from '@/components/Title.vue'		

export default {	
	name: 'ContactView',
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