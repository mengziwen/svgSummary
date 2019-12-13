import Vue from 'vue';
import App from './App.vue';
import {Router, router} from './router'
import { store, install } from './util'
import '@/assets';
Vue.config.productionTip = false;
Vue.use(Router)
Vue.use(install)
declare module 'vue/types/vue' {
  interface Vue {
    $axios: any;
  }
  interface Vue {
    $electron: any;
  }
  interface Vue {
    $day: any;
  }
}
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
