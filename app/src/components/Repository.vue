<template>
  <tr>
    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {{ repo.owner.login }}
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
      {{ repo.name }}
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {{ repo.updatedAt }}
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      <span v-if="needsDeploy" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
        Needs deploy
      </span>
      <a v-else-if="needsMerge" target="_blank" :href="repo.url + '/pulls'" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
        Needs merge
      </a>
      <span v-else class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-grey-100 text-grey-800">
        Up to date
      </span>
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {{ version }}
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    repo: {
      type: Object,
      required: true,
    },
  },
  computed: {
    version() {
      const releases = this.repo.releases.length ? this.repo.releases : [{ tagName: 'v0.0.0' }];
      return releases[0].tagName;
    },
    needsDeploy() {
      const commits = this.repo.history || [{ messageHeadline: this.version }];
      return commits[0].messageHeadline !== this.version;
    },
    needsMerge() {
      return this.repo.openPRs.length > 0;
    }
  }
};
</script>
