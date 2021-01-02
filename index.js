const { build } = require('./app');



/*
* starts the application
*/
const start = async () => {
  // calls to build an app
  const app = await build();
  // get port from environment variable
  const port = parseInt(process.env.PORT || '8080');
  const address = '0.0.0.0';

  const addr = await app.listen(port, address);
  console.log(`Listening on ${address}:${port}`);
}

start()