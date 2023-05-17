<template>
  <div class="about">
    <Title :isMobile="isMobile" :img="'1.jpg'" :text="$t('navigator.introduce')"></Title>
    <ScrollItem 
    	v-for="item in items" 
    	:isMobile="isMobile" 
    	:title="$t(item.title)" 
    	:text="$t(item.text)" 
    	:img="$t(item.img)"
    	:type="item.type"/>
  </div>
</template>

<script>
import Title from '@/components/Title.vue'		
import ScrollItem from '@/components/ScrollItem.vue'

export default {	
	name: 'AboutView',
	props: {
		isMobile: Boolean
	},
	components: {
		Title,
		ScrollItem
	},
	data() {
		return {
			items: [
				{
					title: 'introduce.abstract_title',
					text: 'introduce.abstract',
					type: 'text'
				},
				{
					title: 'introduce.section1_title',
					img: 'introduce.section1_img',
					type: 'image'
				},
				{
					title: 'introduce.section2_title',
					text: 'introduce.section2',
					img: 'introduce.section2_img',
					type: 'mixed'
				}
			]
		}
	}
}
</script>

<style>
	
</style>