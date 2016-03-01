var serverApp = require('../../src/backend-web-app/app.js')
require('chai').should();
var request = require('request');

var port = 4000;

var rootUrl = `http://localhost:${port}`;

describe('application', () => {
    beforeEach(done => {
        serverApp.start(port, () => done());
    });

    afterEach(() => {
        serverApp.stop();
    });

    function verifyResponse(testCallback, requestUrl) {
        request.get(requestUrl)
            .on('response', testCallback);
    }

    describe('calls to root', () => {
        it('should return ok status', done => {
            //request.get(url)
            //    .on('response', res => {
            //        res.statusCode.should.equal(200);
            //        done();
            //    })
            verifyResponse(res => {
                res.statusCode.should.equal(200);
                done()
            }, rootUrl)
        });
    });

    describe('should not restrict', () => {
        it('calls to root', done => {
            verifyResponse(res => {
                res.statusCode.should.not.equal(401);
                done();
            }, rootUrl)
        });

        it('calls to auth resources', done => {
            verifyResponse(res => {
                res.statusCode.should.not.equal(401);
                done();
            },`${rootUrl}/auth`)
        })
    });

    describe('should restrict', () => {
        it('access to pools route', done => {
            verifyResponse(res => {
                res.statusCode.should.equal(401);
                done()
            }, `${rootUrl}/pools`)
        })
    })
});

