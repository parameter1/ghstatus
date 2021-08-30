import { Octokit } from '@octokit/core';

const getEnabled = () => {
  try {
    return JSON.parse(localStorage['ghstatus_enabled']);
  } catch (e) {
    console.error('Unable to load enabled repository list from local storage!', e);
  }
  return [];
};

export default {
  setEnabled: (enabled) => {
    localStorage.setItem('ghstatus_enabled', JSON.stringify(enabled));
  },
  getEnabled,
  getRepositories: async (token, page = null) => {
    const octokit = new Octokit({ auth: token });
    const { data } = await octokit.request('GET /user/repos', {
      sort: 'updated',
      per_page: 25,
    });
    // @todo paginate!
    console.log(page);
    return data;
  },
  getEnabledRepositories: async (token, page = null) => {
    const octokit = new Octokit({ auth: token });
    const enabled = getEnabled();
    console.log('getEnabledRepositories', token, enabled, page);
    return Promise.all(enabled.map(async (fullName) => {
      const [owner, name] = fullName.split('/', 2);
      const { repository } = await octokit.graphql(
        `query RepoSummary($owner: String!, $name: String!) {
          repository(owner: $owner, name: $name) {
            id
            owner {
              login
            }
            url
            name
            updatedAt
            releases(last: 1) {
              edges {
                node {
                  id
                  tagName
                  updatedAt
                }
              }
            }
            pullRequests(states: OPEN, first: 1, orderBy: { field: UPDATED_AT, direction: DESC }) {
              edges {
                node {
                  id
                  url
                  number
                  updatedAt
                  title
                }
              }
            }
            object(expression: "master") {
              ... on Commit {
                history(first: 10) {
                  edges {
                    node {
                      messageHeadline
                    }
                  }
                }
              }
            }
          }
        }`,
        { owner, name },
      );
      const data = {
        ...repository,
        // @todo use get
        releases: repository.releases.edges.map(({ node }) => node),
        openPRs: repository.pullRequests.edges.map(({ node }) => node),
        history: repository.object.history.edges.map(({ node }) => node),
      };
      console.log(data);
      return data;
    }));
  },
};
