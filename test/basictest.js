var request = require('supertest'),
    app = require('express')(),
    blanket = require('blanket')({
        "pattern": "lib",
        "data-cover-never": "node_modules"
    });

require('../lib/losdos')(app, { verbose: false, routes: __dirname + '/routes' });

describe('routes/stuff/mockstuff.js#get', function(){
    describe('GET /api/stuff', function(){
        it('should respond with json', function(done){
            request(app)
                    .get('/api/stuff')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200, done);
        });
    });

    describe('GET /stuff', function(){
        it('should NOT be found', function(done){
            request(app)
                    .get('/stuff')
                    .expect(404, done);
        });
    });

    describe('GET /api/stuff/get', function(){
        it('should NOT be found', function(done){
            request(app)
                    .get('/api/stuff/get')
                    .expect(404, done);
        });
    });

    describe('GET /stuff/get', function(){
        it('should NOT be found', function(done){
            request(app)
                    .get('/stuff/get')
                    .expect(404, done);
        });
    });
});

describe('routes/stuff/mockstuff.js#view', function(){
    it('should respond with expected content', function(done){
        request(app)
                .get('/stuff/view')
                .expect('routes/stuff/mockstuff.js#view')
                .expect(200, done);
    })
});

describe('routes/stuff/mockstuff.js#put', function(){
    describe('PUT /api/stuff', function(){
        it('should respond with json', function(done){
            request(app)
                    .put('/api/stuff')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect({route: 'routes/stuff/mockstuff.js#put.index', success: true})
                    .expect(200, done);
        });

        it('should respond with json with a slash', function(done){
            request(app)
                    .put('/api/stuff/')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect({route: 'routes/stuff/mockstuff.js#put.index', success: true})
                    .expect(200, done);
        });
    });

    describe('PUT /api/stuff/otherstuff', function(){
        it('should respond with json', function(done){
            request(app)
                    .put('/api/stuff/otherstuff')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect({route: 'routes/stuff/mockstuff.js#put.otherstuff', success: true})
                    .expect(200, done);
        });
    });
});
