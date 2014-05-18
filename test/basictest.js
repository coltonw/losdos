var request = require('supertest'),
    app = require('express')(),
    blanket = require('blanket')({
        "pattern": "lib",
        "data-cover-never": "node_modules"
    });

// We don't want output but we do want to test that logging does not break the program
console.log = function() {};
require('../lib/losdos')(app, { verbose: true, routes: __dirname + '/routes' });

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

describe('routes/thing/thing_id/mocksinglething.js#thing_id', function(){
    describe('GET /thing/:thing_id', function(){
        it('should have the attached thing', function(done){
            var fakeId = 'fakefake';
            request(app)
                    .get('/thing/' + fakeId)
                    .expect('Content-Type', /json/)
                    .expect({
                        route: 'routes/thing/thing_id/mocksinglething.js#index',
                        thing: 'routes/thing/thing_id/mocksinglething.js#thing_id:' + fakeId})
                    .expect(200, done);
        });

        it('should respond with same thing even with a slash', function(done){
            var fakeId = 'fakefake2';
            request(app)
                    .get('/thing/' + fakeId + '/')
                    .expect('Content-Type', /json/)
                    .expect({
                        route: 'routes/thing/thing_id/mocksinglething.js#index',
                        thing: 'routes/thing/thing_id/mocksinglething.js#thing_id:' + fakeId})
                    .expect(200, done);
        });
    });
    describe('DELETE /thing/:thing_id', function(){
        it('should respond as expected', function(done){
            var fakeId = 'fakefake3';
            request(app)
                    .delete('/api/thing/' + fakeId + '/')
                    .expect('Content-Type', /json/)
                    .expect({
                        route: 'routes/thing/thing_id/mocksinglething.js#delete',
                        thing: 'routes/thing/thing_id/mocksinglething.js#thing_id:' + fakeId})
                    .expect(200, done);
        });
    });
    describe('POST /thing/:thing_id', function(){
        it('should respond as expected', function(done){
            var fakeId = 'fakefake4';
            request(app)
                    .post('/api/thing/' + fakeId)
                    .expect('Content-Type', /json/)
                    .expect({
                        route: 'routes/thing/thing_id/mocksinglething.js#post',
                        thing: 'routes/thing/thing_id/mocksinglething.js#thing_id:' + fakeId})
                    .expect(200, done);
        });
    });
});

