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
import nProgress from 'nprogress';
import 'nprogress/nprogress.css'
import { httpGet } from '@/utils/http'

Vue.config.productionTip = false

Vue.prototype.changeLanguage = function() {
  let lan;
  switch(this.$i18n.locale) {
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
}

const app = new Vue({
  router,
  i18n,
  render: h => h(App)
})

nProgress.start();

httpGet('/res/lang/zh.json').then((res) => {
  i18n.mergeLocaleMessage('zh', res.data);
  nProgress.inc();
  httpGet('/res/lang/en.json').then((res) => {
    i18n.mergeLocaleMessage('en', res.data);
    document.title = i18n.t('title.company_name');
    app.$mount('#app')
  }).catch((err) => {
    console.error(err)
  })
}).catch((err) => {
  console.error(err)
}).finally(() => {
  nProgress.done();
})
