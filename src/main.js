import Vue from 'vue'
import App from './App'
import router from '@/router'
import store from '@/store'
import api from '@/api'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueI18n from 'vue-i18n'
import '@/assets/font/font.css'
import '@/plugins'

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.use(VueI18n);

Vue.prototype.$api = api;

//语言分两类：对于静态页面，使用vue-i18n，这里是locale；对于需要发起请求获取目标语言数据的页面，使用vuex，对应$store.state.lang。
//两者在页面刷新时都会丢失状态，因此均通过localStorage保存最新状态。
const i18n = new VueI18n({
  locale: localStorage.getItem("language") || "en",
  fallbackLocale: 'en',
/*  silentTranslationWarn: true*/
});

export default new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#containeros');
