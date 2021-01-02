// app factory

const fastify = require('fastify');
const { rooutes } = require('./routes');

/*
  @param ({ logger: boolean, trusyProxy: boolean }) options
  @returns (*)
*/

exports.build = async (options = { logger: true, trustProxy: true }) => {
  // initialize our fastify server
  const app = fastify(options);


  

  return app;
}