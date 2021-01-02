const { build } = require('../../app');
const { writeFileSync, readFileSync } = require('fs');
const { join } = require('path');
const { getTodos } = require('../../lib/get-todos');

require('tap').mochaGlobals();
require('should');

// allows us to have a context when we're testing
describe('for the route for root (/)', () => {
  let app;
  let ids = [];
  const filename = join(__dirname, '../../database.json');
  const encoding = 'utf8';

  before(async () => {
    // initialize backend app
    app = await build();
  })

  // after(async () => {
  //   const todos = getTodos(filename, encoding);
  //   for (const id of ids) {
  //     console.log("Todos", todos);
  //     const index = todos.findIndex(todo => todo.id === id);

  //     // delete the id
  //     if (index >= 0) {
  //       todos.splice(index, 1);
  //     }
  //     writeFileSync(filename, JSON.stringify({ todos }, null, 2), encoding);
  //   }
  // });

  /**
   * happy path: when users are doing something expectedly.
   */
  it('it should return { success: true, data: ( new todo object )} and has a status code of 200 when called using GET',
    async () => {
      const response = await app.inject({
        method: "POST",
        url: "/todo",
        payload: {
          text: 'This is a todo',
          done: false
        }
      });

      const payload = response.json();
      const { success, data } = payload;
      const { statusCode } = response;
      const { text, done, id } = data;
      

      success.should.equal(true);
      statusCode.should.equal(200);
      text.should.equal('This is a todo');
      done.should.equal(false);

      const todos = getTodos(filename, encoding);
      const index = todos.findIndex(todo => todo.id === id);
      
      index.should.not.equal(-1);
      const { text: textDatabase, done: doneDatabase } = todos[index];
      text.should.equal(textDatabase);
      done.should.equal(doneDatabase);
      // save id for cleaning
      ids.push(id);
    })
  
  // another happy path, but with no passed "done"
  it('it should return { success: true, data: ( new todo object )} and has a status code of 200 when called using POST even if we don\'t provide the done property. Default of done should be false',
    async () => {
      const response = await app.inject({
        method: "POST",
        url: "/todo",
        payload: {
          text: 'This is a todo 2'
        }
      });

      const payload = response.json();
      const { success, data } = payload;
      const { statusCode } = response;
      const { text, done, id } = data;

      success.should.equal(true);
      statusCode.should.equal(200);
      text.should.equal('This is a todo 2');
      done.should.equal(false);

      
      const todos = getTodos(filename, encoding);
      const index = todos.findIndex(todo => todo.id === id);
      
      index.should.not.equal(-1);
      const { text: textDatabase, done: doneDatabase } = todos[index];
      text.should.equal(textDatabase);
      done.should.equal(doneDatabase);
      // save id for cleaning
      ids.push(id);
    });
})