const fetch = require('node-fetch');
const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = require('../../env');

/**
 * Obtains an authentication token from the GitHub API using the supplied OAuth code.
 */
module.exports = async (fastify) => {
  fastify.post('/github', async (request) => {
    const { code } = request.body;
    // Get the access token from the GitHub API using the OAuth code.
    const token = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code,
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
      }),
    });
    return token.json();
  });
};
