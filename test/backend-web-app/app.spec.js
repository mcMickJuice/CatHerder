var serverApp = require('../../src/backend-web-app/app.js')
var expect = require('chai').expect;




describe('my first test', function () {
    beforeEach( done => {
        console.log('starting app')
        serverApp.start(4000, () => done());

    });

    afterEach(() => {
        serverApp.stop();
    })

    it('should pass', function () {
        expect(9).to.equal(9);
    })

    it('should pass again', function () {
        expect(100).to.not.equal(10);
    })
})