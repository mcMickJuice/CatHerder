import moduleToTest from '../../src/backend-web-app/auth/requestAuthorizationMiddleware';
import sinon from 'sinon'
import {expect} from 'chai'

describe('auth middleware', function () {

    describe('should not auth certain routes', function () {
        var getCookieSpy;
        var unitToTest;
        beforeEach(() => {
            getCookieSpy = sinon.spy();
            moduleToTest.__Rewire__('getCookie',getCookieSpy);
            //match anything that matches root dir
            unitToTest = moduleToTest(/^\/$/)
        });

        afterEach(() => {
            moduleToTest.__ResetDependency__('getCookie');
        });

        function StubResponse() {
            this.status = function() {
                return this;
            }

            this.json = function() {

            }
        }

        it('if they match the given pattern', function () {
            var req = {
                path: '/'
            };

            var nextSpy = sinon.spy();
            unitToTest(req, new StubResponse(), nextSpy);
            expect(getCookieSpy.called).to.be.false;
            expect(nextSpy.called).to.be.true;
        });

        it('but should check auth if pattern isn\'t matched', function () {
            var req = {
                path: '/secureRoute'
            }

            unitToTest(req, new StubResponse(), () => {});

            expect(getCookieSpy.called).to.be.true;
        })
    });

    describe('should pull username from cookie', function () {

        it('and return 401 if username isnt present', function () {
            moduleToTest.__Rewire__('getCookie', function () {
                return undefined;
            });
            var unitToTest = moduleToTest(/nevergonna match/);
            var req = {
                path: '/'
            };
            var stub = sinon.stub();
            stub.returns({
                json: () => {
                }
            });
            var res = {
                status: stub
            };

            unitToTest(req, res, () => {
            });

            expect(stub.calledWith(401)).to.be.true;

            moduleToTest.__ResetDependency__('getCookie');
        })

        describe('if username is present', function () {
            var username = 'mjoyce';
            var unitToTest;
            beforeEach(() => {
                moduleToTest.__Rewire__('getCookie', function () {
                    return username;
                })

                unitToTest = moduleToTest(/nevergonnamatch/)
            })

            afterEach(() => {
                moduleToTest.__ResetDependency__('getCookie');
            })

            it('set username on req.user', function () {
                var req = {};
                unitToTest(req, {}, () => {
                })

                expect(req.user).to.equal(username)
            });

            it('call next to allow request', function () {
                var spy = sinon.spy();
                unitToTest({}, {}, spy);
                expect(spy.called).to.be.true
            })
        })
    })
});
