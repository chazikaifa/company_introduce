<template>
  <div class="about">
    <Title :isMobile="isMobile" :img="'banner_about.jpg'" :text="$t('navigator.introduce')"></Title>
    <ScrollItem 
    	v-for="item in items" 
    	:isMobile="isMobile" 
    	:title="$t(item.title)" 
    	:text="$t(item.text)" 
    	:img="$t(item.img)"
    	:color="$t(item.color)"
    	:type="$t(item.type)"/>
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
					title: 'introduce.abstract.title',
					text: 'introduce.abstract.text',
					img: 'introduce.abstract.img',
					type: 'introduce.abstract.type',
					color: 'introduce.abstract.color'
				},
				{
					title: 'introduce.section1.title',
					text: 'introduce.section1.text',
					img: 'introduce.section1.img',
					type: 'introduce.section1.type',
					color: 'introduce.section1.color'
				},
				{
					title: 'introduce.section2.title',
					text: 'introduce.section2.text',
					img: 'introduce.section2.img',
					type: 'introduce.section2.type',
					color: 'introduce.section2.color'
				}
			]
		}
	}
}
</script>

<style>
	
</style>