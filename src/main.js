import Vue from 'vue'
import App from './App'
import router from '@/router'
import store from '@/store'
import i18n from '@/i18n'
import '@/api'
import '@/assets/font/font.css'
import '@/icons'
import '@/layout'
import '@/plugins'

Vue.config.productionTip = false;

export default new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#containeros');
