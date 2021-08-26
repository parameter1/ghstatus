<template>
  <div class="header">
    <button class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @click="authenticate">
      <span v-if="token">Log out</span>
      <span v-else>Log in with GitHub</span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    token: String,
  },
  methods: {
    authenticate() {
      if (this.token) return this.$emit('logout');

      this.$auth.authenticate('github')
      .then((data) => {
        // Execute application logic after successful social authentication
        console.log('authed', data);
      }).catch((err) => {
        // Execute application logic after failed social authentication
        console.log('failed', err);
      });
    },
  },
};
</script>
