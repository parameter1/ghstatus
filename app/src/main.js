import Vue from 'vue'
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import axios from 'axios';
import App from './App.vue'
import router from './router'

const feUrl = process.env.VUE_APP_FRONTEND_URL || 'http://localhost:8080';
const beUrl = process.env.VUE_APP_BACKEND_URL || 'http://localhost:3000';

Vue.use(VueAxios, axios)
Vue.use(VueAuthenticate, {
  baseUrl: beUrl, // Your API domain
  providers: {
    github: {
      scope: 'repo', // @todo, can this be a smaller scope?
      clientId: '9447e0e308f852a0d11e',
      redirectUri: `${feUrl}/auth/callback`, // Your client app URL
    },
  },
  tokenName: 'ghstatus_token',
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
