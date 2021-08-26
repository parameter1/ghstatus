'use strict'

const fp = require('fastify-plugin')

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

module.exports = fp(async function (fastify) {
  fastify.addHook('onRequest', async (_, reply) => {
    reply.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    reply.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    reply.header('Access-Control-Allow-Method', 'POST');
  });
  fastify.options('*', (_, reply) => {
    reply.send(200);
  });
});
