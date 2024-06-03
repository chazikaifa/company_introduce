import Vue from 'vue'
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);
import zh from './lang/zh';
import en from './lang/en';

const i18n = new VueI18n({
  // 设置默认语言
  locale: navigator.language.includes('zh') ? 'zh' : 'en', // 语言标识
  // 添加多语言（每一个语言标示对应一个语言文件）
  messages: {
    zh,
    en,
  }
})
// 暴露i18n
export default i18n;