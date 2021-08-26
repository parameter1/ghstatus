import Vue from 'vue'
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import axios from 'axios';
import App from './App.vue'

Vue.use(VueAxios, axios)
Vue.use(VueAuthenticate, {
  baseUrl: 'http://localhost:8080', // Your API domain
  providers: {
    github: {
      scope: 'repo', // @todo, can this be a smaller scope?
      clientId: '9447e0e308f852a0d11e',
      redirectUri: 'http://localhost:8080/auth/callback' // Your client app URL
    },
  },
});

// Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
