import Vue from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

Vue.prototype.changeLanguage = function() {
	let lan;
	switch(localStorage.getItem('languageSet')) {
		case "zh":
			lan = "en"
			break;
		case "en":
			lan = "zh"
			break;
		default:
			lan = "en"
	}
	this.$i18n.locale = lan;
	localStorage.setItem('languageSet', lan)
}

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
