import { Octokit } from '@octokit/core';
import RepoListQuery from '../graphql/queries/repo-list.js';
import RepoStatusQuery from '../graphql/queries/repo-status.js';

const getToken = () => localStorage.getItem('vue-authenticate.vueauth_ghstatus_token');

const getEnabled = () => {
  try {
    return JSON.parse(localStorage.getItem('ghstatus_enabled'));
  } catch (e) {
    console.error('Unable to load enabled repository list from local storage!', e);
  }
  return [];
};

/**
 * Retrieves and updates repository cache with user acessible repositories
 */
const fetchRepos = async (after = null, store = false) => {
  const octokit = new Octokit({ auth: getToken() });
  const { viewer: { repositories } } = await octokit.graphql(RepoListQuery, {
    ...(after && { after }),
  });
  const mapped = repositories.edges.map(({ node }) => node);
  const rest = repositories.pageInfo.hasNextPage ? await fetchRepos(repositories.pageInfo.endCursor) : [];
  const cache = [...mapped, ...rest];
  if (store) localStorage.setItem('__repos', JSON.stringify(cache));
  return cache;
};

export default {
  setEnabled: (enabled) => {
    localStorage.setItem('ghstatus_enabled', JSON.stringify(enabled));
  },
  getEnabled,
  fetchRepos,
  getRepositories: async () => {
    try {
      const repos = JSON.parse(localStorage.getItem('__repos')) || [];
      if (!repos.length) return fetchRepos(null, true);
      return repos;
    } catch (e) {
      console.error(e);
    }
    return [];
  },
  getEnabledRepositories: async () => {
    const octokit = new Octokit({ auth: getToken() });
    const enabled = getEnabled();
    return Promise.all(enabled.map(async (fullName) => {
      const [owner, name] = fullName.split('/', 2);
      const { repository } = await octokit.graphql(RepoStatusQuery, { owner, name });
      const data = {
        ...repository,
        // @todo use get
        releases: repository.releases.edges.map(({ node }) => node),
        openPRs: repository.pullRequests.edges.map(({ node }) => node),
        history: repository.object.history.edges.map(({ node }) => node),
      };
      return data;
    }));
  },
};
