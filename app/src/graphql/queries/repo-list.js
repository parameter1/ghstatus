export default `
query UserRepos($after: String) {
  viewer {
    repositories(
      ownerAffiliations: [ORGANIZATION_MEMBER, OWNER, COLLABORATOR]
      orderBy: { field: CREATED_AT, direction: DESC }
      isFork: false
      first: 30
      after: $after
    ) {
      edges {
        node {
          id
          nameWithOwner
          updatedAt
        }
      }
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}
`;
