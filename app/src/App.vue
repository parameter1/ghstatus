<template>
  <div id="app">
    <nav class="bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img class="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow">
            </div>
            <div class="ml-10 flex items-baseline space-x-4">
              <NavLink class="px-3 py-2 rounded-md text-sm font-medium" to="/" :exact=true>Dashboard</NavLink>
              <NavLink class="px-3 py-2 rounded-md text-sm font-medium" to="/config">Config</NavLink>
            </div>
          </div>
          <div>
            <div class="ml-4 flex items-center md:ml-6">
              <AuthButton :token="token" @logout="logout" @login="login" />
            </div>
          </div>
        </div>
      </div>
    </nav>

    <router-view/>
  </div>
</template>

<script>
import './css/styles.css';
import AuthButton from './components/AuthButton.vue';
import NavLink from './components/NavLink.vue';

export default {
  name: 'App',
  data: () => ({
    token: '',
  }),
  computed: {
    isLoggedIn() {
      return Boolean(this.token);
    },
  },
  mounted() {
    if (localStorage['vue-authenticate.vueauth_ghstatus_token']) {
      console.log('loaded token from storage');
      this.token = localStorage['vue-authenticate.vueauth_ghstatus_token'];
    }
  },
  watch: {
    token(newToken) {
      console.log('setting token to ', newToken);
      localStorage['vue-authenticate.vueauth_ghstatus_token'] = newToken;
    },
  },
  methods: {
    login(newToken) {
      this.token = newToken;
    },
    logout() {
      localStorage.removeItem('vue-authenticate.vueauth_ghstatus_token');
      this.token = '';
    },
  },
  components: {
    AuthButton,
    NavLink,
  },
};
</script>
