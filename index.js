const fastify = require('fastify');


// initialize our fastify server
const server = fastify({
  logger: true,
  trustProxy: true
});

// access root address => localhost:<port>/ 
server.get('/', {
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


// start server
const start = async () => {
  // get port from environment variable
  const port = parseInt(process.env.PORT || '8080');
  const address = '0.0.0.0';

  const addr = await server.listen(port, address);
  console.log(`Listening on ${address}:${port}`);
}

start()