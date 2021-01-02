const { build } = require('../app');

require('tap').mochaGlobals();
require('should');

// allows us to have a context when we're testing
describe('for the route for root (/)', () => {
  let app;

  beforeEach(async () => {
    // initialize backend app
    app = await build();
  })

  it('it should return { success: true } when called using GET', async () => {
    const response = await app.inject({
      method: "GET",
      url: "/"
    })

    const payload = response.json();
    const { success } = payload;
    const { statusCode } = response;

    success.should.equal(true);
    statusCode.should.equal(200);
    
    console.log('payload', payload);
  })
})