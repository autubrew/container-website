import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n);

//语言分两类：对于静态页面，使用vue-i18n，这里是locale；对于需要发起请求获取目标语言数据的页面，使用vuex，对应$store.state.lang。
//两者在页面刷新时都会丢失状态，因此均通过localStorage保存最新状态。
const i18n = new VueI18n({
  locale: localStorage.getItem("language") || "en",
  fallbackLocale: 'en',
/*  silentTranslationWarn: true*/
});

export default i18n;