// app factory

const fastify = require('fastify');

/*
  @param ({ logger: boolean, trusyProxy: boolean }) options
  @returns (*)
*/

exports.build = async (options = { logger: true, trustProxy: true }) => {
  // initialize our fastify server
  const app = fastify(options);


  app.get('/', {
    /*
    *
    * @param (*) req - this is the request parameter that is sent by the client
    * 
    */
    handler: async (req) => {
      console.log(req);
      // response in JSON format
      return { success: true }
    }
  })

  return app;
}