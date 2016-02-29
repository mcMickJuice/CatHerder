var serverApp = require('../../src/backend-web-app/app.js')
var expect = require('chai').should();
var http = require('http');

var port = 4000
var url = `http://localhost:${port}`;

describe('calls to root', function () {
    beforeEach( done => {
        console.log('starting app')
        serverApp.start(port, () => done());
    });

    afterEach(() => {
        serverApp.stop();
    });

    it('should return ok status', function(done) {
        http.get(url, res => {
            res.statusCode.should.equal(200);
            done();
        })
    });
})