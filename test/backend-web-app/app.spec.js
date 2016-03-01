var serverApp = require('../../src/backend-web-app/app.js')
require('chai').should();
var request = require('request');

var port = 4000;

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
        request.get(url)
            .on('response', res => {
            res.statusCode.should.equal(200);
            done();
        })
    });
})