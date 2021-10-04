<template>
  <div>
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <h1 class="text-lg leading-6 font-semibold text-gray-900">
          Dashboard
        </h1>
      </div>
    </header>

    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="flex flex-col mt-3">
          <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Organization
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Repository Name
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Updated
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Version
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-if="error">
                      <td colspan=6 class="px-6 py-4 whitespace-nowrap text-center text-sm text-red-500">{{ error }}</td>
                    </tr>
                    <tr v-if="loading">
                      <td colspan=6 class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">Loading repository statuses...</td>
                    </tr>
                    <tr v-else-if="!repositories.length">
                      <td colspan=6 class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">No repositories enabled. Update your settings on the <a href="/config">Config screen</a>.</td>
                    </tr>
                    <Repository v-else v-for="repo in repositories" :key="repo.id" :repo="repo" />
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Repository from '../components/Repository.vue';
import store from '../store/repositories';

export default {
  data: () => ({
    repositories: [],
    error: null,
    loading: true,
  }),
  props: {
    token: String,
  },
  components: {
    Repository,
  },
  async created() {
    try {
      this.repositories = await store.getEnabledRepositories();
    } catch (e) {
      this.error = e;
    } finally {
      this.loading = false;
    }
  },
};
</script>
