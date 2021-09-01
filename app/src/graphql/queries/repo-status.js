export default `
query RepoSummary($owner: String!, $name: String!) {
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
          isDraft
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
}`;
