<template>
  <router-link v-bind="$props" custom v-slot="{ isActive, href, navigate }">
    <a v-bind="$attrs" :href="href" @click="navigate" :class="isActive ? activeClass : inactiveClass" >
      <slot />
    </a>
  </router-link>
</template>

<script>
export default {
  name: 'NavLink',
  inheritAttrs: false,

  props: {
    to: String,
    exact: {
      type: Boolean,
      default: false,
    },
    activeClass: {
      type: String,
      default: 'bg-gray-900 text-white',
    },
    inactiveClass: {
      type: String,
      default: 'text-gray-300 hover:bg-gray-700 hover:text-white',
    },
  },
};
</script>
