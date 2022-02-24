import Vue from 'vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import vueToPdf from 'vue-to-pdf';
import 'popper.js'
import './axios';
import './assets/css/app.css';
import './assets/css/bootstrap.min.css';
import './assets/css/app.min.css'
import './assets/css/icons.min.css';
import JwPagination from 'jw-vue-pagination';
import excel from 'vue-excel-export';
import 'simplebar/dist/simplebar.min.css';
import vueCountryRegionSelect from 'vue-country-region-select'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faCaretRight, faUsers, faCogs, faUser, faTicketAlt, faBan, faHouseUser, faCog, faAsterisk} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Toasted from 'vue-toasted';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import App from './App.vue'
import router from './router'
import store from './store'

import Echo from 'laravel-echo'

window.Pusher = require('pusher-js')

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: "e723f7a65963abe24ec6",
  cluster: "mt1",
  forceTLS: true,
})

library.add(faUserSecret, faCaretRight, faUsers, faUser, faCogs, faBan, faTicketAlt, faHouseUser, faCog, faAsterisk,)
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('jw-pagination', JwPagination);
Vue.config.productionTip = false
Vue.use(excel)
Vue.use(vueToPdf);
Vue.use(VueSweetalert2);
Vue.use(vueCountryRegionSelect)
Vue .use(Toasted, {
  position: "bottom-right",
  type:'success',
  duration: 3000,
  iconPack: 'custom-class',
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
