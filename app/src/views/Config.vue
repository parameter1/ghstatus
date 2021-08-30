<template>
  <div>
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <h1 class="text-lg leading-6 font-semibold text-gray-900">
          Configuration
        </h1>
      </div>
    </header>

    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Replace with your content -->
        <div class="px-4 py-4 sm:px-0">
          <div class="border-4 border-dashed border-gray-200 rounded-lg h-96">
            <h2>Repositories</h2>

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
                          <th scope="col" class="relative px-6 py-3">
                            <span class="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-if="error">
                          <td colspan=5 class="px-6 py-4 whitespace-nowrap text-center text-sm text-red-500">{{ error }}</td>
                        </tr>
                        <tr v-if="loading">
                          <td colspan=5 class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">Loading repositories...</td>
                        </tr>
                        <tr v-else v-for="repo in repositories" :key="repo.id">
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {{ repo.owner.login }}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {{ repo.name }}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {{ repo.updated_at }}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span v-if="repo._enabled" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Active
                            </span>
                            <span v-else class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-grey-100 text-grey-800">
                              Inactive
                            </span>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button @click="toggleRepo(repo)" class="text-indigo-600 hover:text-indigo-900">
                              {{ repo._enabled ? 'Disable' : 'Enable' }}
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <p class="text-grey mt-6 pb-6 text-center">
              Missing repositories? <a href="https://github.com/settings/connections/applications/9447e0e308f852a0d11e" target="_blank" class="text-indigo-600 hover:text-indigo-900">Review organization access</a>.
            </p>
          </div>
        </div>
        <!-- /End replace -->
      </div>
    </main>
  </div>
</template>

<script>
import store from '../store/repositories';

export default {
  data: () => ({
    enabled: [],
    available: [],
    loading: true,
    error: null,
  }),
  computed: {
    repositories() {
      return this.available.map((repo) => ({
        ...repo,
        _enabled: this.enabled.includes(repo.full_name),
      }));
    },
  },
  props: {
    token: String,
  },
  async mounted() {
    try {
      if (!this.token) throw new Error('Unauthenticated! Log in first.');
      this.enabled = await store.getEnabled();
      this.available = await store.getRepositories(this.token);
    } catch (e) {
      this.error = e;
    } finally {
      this.loading = false;
    }
  },
  watch: {
    enabled(v) {
      store.setEnabled(v);
    },
  },
  methods: {
    toggleRepo(repo) {
      if (this.enabled.includes(repo.full_name)) {
        this.enabled.splice(this.enabled.indexOf(repo.full_name), 1);
      } else {
        this.enabled.push(repo.full_name);
      }
    },
  },
}
</script>
