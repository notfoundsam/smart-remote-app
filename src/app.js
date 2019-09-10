// Import Vue
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import store from './store';
import VueSocketIO from 'vue-socket.io'
// import VueSocketIO from 'vue-socket.io-extended';
// import io from 'socket.io-client';

// Import config
import { ajaxURL } from './config.js';

// Import F7
import Framework7 from 'framework7/framework7.esm.bundle.js';

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';

// Import F7 Styles
// import Framework7Styles from 'framework7/css/framework7.css';
import 'framework7/css/framework7.bundle.css';

// Import Icons and App Custom Styles
import IconsStyles from './css/icons.css';
import AppStyles from './css/app.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCog, faCogs, faPlus, faBars, faSlidersH, faCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUsb, faRaspberryPi } from '@fortawesome/free-brands-svg-icons';

// Import App Component
import App from './app.vue';

library.add(
  faCog,
  faCogs,
  faPlus,
  faBars,
  faSlidersH,
  faUsb,
  faRaspberryPi,
  faCircle,
  faTrashAlt
)

// const socketInstance = io(ajaxURL, {
//   transports: ['polling', 'websocket'],
// });

// Init F7 Vue Plugin
Framework7.use(Framework7Vue);
// Vue.use(VueAxios, axios, store);
Vue.use(VueAxios, axios);

Vue.use(new VueSocketIO({
  debug: true,
  connection: ajaxURL,
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
}));

// Vue.use(VueSocketIO, io(ajaxURL), {
//   store,
//   actionPrefix: 'SOCKET_',
//   mutationPrefix: 'SOCKET_'
// });

// Send credentails automatically with AJAX
axios.defaults.withCredentials = true;

// Register global components
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

// Init App
new Vue({
  el: '#app',
  store,
  template: '<app/>',

  // Register App Component
  components: {
    app: App,
  }
});
