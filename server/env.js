require('dotenv').config();
const envalid = require('envalid');

const { cleanEnv, str } = envalid;

module.exports = cleanEnv(process.env, {
  GITHUB_CLIENT_ID: str({ desc: 'The Github OAuth application Client ID', default: '9447e0e308f852a0d11e' }),
  GITHUB_CLIENT_SECRET: str({ desc: 'The Github OAuth application secret key' }),
});
