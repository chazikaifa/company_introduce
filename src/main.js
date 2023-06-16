import Vue from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  ak: 'RA7RvcXBVM4QLrHZ2Rlupjg3p5dVTdY3'
})

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
  document.title = this.$t('title.company_name');
  localStorage.setItem('languageSet', lan)
}

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
