var request = require('supertest'),
    app = require('express')();

require('../lib/losdos')(app, { verbose: true, routes: __dirname + '/routes' });

describe('GET /api/stuff', function(){
  it('respond with json', function(done){
    request(app)
      .get('/api/stuff')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })
});

describe('GET /stuff/view', function(){
  it('respond with json', function(done){
    request(app)
      .get('/stuff/view')
	  .expect('hello')
      .expect(200, done);
  })
});
