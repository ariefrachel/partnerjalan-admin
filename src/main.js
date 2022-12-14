import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
require('@/assets/css/sidebar.css')
import '@fortawesome/fontawesome-free/js/all'
import './assets/css/style.css'



Vue.config.productionTip = false

Vue.prototype.$pathApi = "https://b3fa-103-166-147-253.ap.ngrok.io/"


import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
