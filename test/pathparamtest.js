var config = require('../config'),
    request = require('supertest'),
    app = require('express')(),
    blanket = require('blanket')(config.blanket);

// We don't want output but we do want to test that logging does not break the program
console.log = function() {};
require('../lib/losdos')(app, { verbose: true, routes: __dirname + '/routes' });

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
