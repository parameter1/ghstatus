import Vue from 'vue'
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import axios from 'axios';
import App from './App.vue'
import router from './router'

Vue.use(VueAxios, axios)
Vue.use(VueAuthenticate, {
  baseUrl: 'http://localhost:3000', // Your API domain
  providers: {
    github: {
      scope: 'repo', // @todo, can this be a smaller scope?
      clientId: '9447e0e308f852a0d11e',
      redirectUri: 'http://localhost:8080/auth/callback' // Your client app URL
    },
  },
  tokenName: 'ghstatus_token',
});

// Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
