export default `
query UserRepos($after: String) {
  viewer {
    repositories(
      affiliations: [ORGANIZATION_MEMBER, OWNER, COLLABORATOR]
      ownerAffiliations: [ORGANIZATION_MEMBER, OWNER, COLLABORATOR]
      orderBy: { field: NAME, direction: ASC }
      isFork: false
      first: 100
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
