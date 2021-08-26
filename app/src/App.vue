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
              <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
              <a href="#" class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Dashboard</a>
            </div>
          </div>
          <div>
            <div class="ml-4 flex items-center md:ml-6">
              <AuthButton :token="token" @logout="logout" />
            </div>
          </div>
        </div>
      </div>
    </nav>

    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <h1 class="text-lg leading-6 font-semibold text-gray-900">
          Dashboard
        </h1>
      </div>
    </header>

    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Replace with your content -->
        <div class="px-4 py-4 sm:px-0">
          <div class="border-4 border-dashed border-gray-200 rounded-lg h-96">
            <HelloWorld msg="Welcome to Your Vue.js App"/>
          </div>
        </div>
        <!-- /End replace -->
      </div>
    </main>
  </div>
</template>

<script>
import './css/styles.css';
import AuthButton from './components/AuthButton.vue';
import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'App',
  data: () => ({
    token: '',
  }),
  mounted() {
    if (localStorage.githubToken) {
      console.log('loaded token from storage');
      this.token = localStorage.githubToken;
    }
  },
  watch: {
    token(newToken) {
      console.log('setting token to ', newToken);
      localStorage.githubToken = newToken;
    },
  },
  methods: {
    logout() {
      localStorage.removeItem('githubToken');
      this.token = '';
    },
  },
  components: {
    AuthButton,
    HelloWorld,
  },
};
</script>
