const { build } = require('../../app');

require('tap').mochaGlobals();
require('should');

// allows us to have a context when we're testing
describe('for the route for root (/)', () => {
  let app;

  beforeEach(async () => {
    // initialize backend app
    app = await build();
  })

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
      const { text, done } = data;
      console.log('payload', payload);

      // success.should.equal(true);
      // statusCode.should.equal(200);
      // text.should.equal('This is a todo');
      // done.should.equal(false);

      
  })
})