const { v4: uuid } = require('uuid');
const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

/**
 * this is the route for creating todos
 * @param {*} app 
 */


exports.create = app => {
  app.post('/todo', {
    /*
      * handles the request for a given route
      * @param { import('fastify).FastifyRequest } request
      * @param { import('fastify).FastifyReply<Response> } response
    */
    handler: async (req, res) => {
      // create a unique identifier
      const id = uuid();
      const { body } = req;
      // get text and done with default false from body, regardless if it has
      // an object value or null, which makes it return an empty object
      const { text, done = false } = body;
      
      // get filename
      const filename = join(__dirname, '../../database.json');
      const encoding = 'utf8';
      const databaseStringContent = readFileSync(filename, encoding);
      const database = JSON.parse(databaseStringContent);

      const data = {
        id,
        text,
        done,
        dateCreated: new Date().getTime(), // UNIX epoch time in milliseconds
        dateUpdated: new Date().getTime()
      };

      database.todos.push(data);
      // added and null and 2 when stringify-ing the object 
      // so that the JSON file looks visually pleasing
      const newDatabaseStringContent = JSON.stringify(database, null, 2);
      writeFileSync(filename, newDatabaseStringContent, encoding);

      return {
        success: true,
        data
      }

    }
  })
};