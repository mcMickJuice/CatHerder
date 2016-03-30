import moduleToTest from '../../../src/backend-web-app/auth/requestAuthorizationMiddleware';
import test from 'ava';
import sinon from 'sinon';

function StubResponse() {
    this.status = function () {
        return this;
    }

    this.json = function () {

    }
}

let getCookieSpy,
    unitToTest
test.beforeEach(() => {
    getCookieSpy = sinon.spy();
    moduleToTest.__Rewire__('getCookie', getCookieSpy);
    //match anything that matches root dir
    unitToTest = moduleToTest(/^\/$/);
});

test.afterEach(() => {
    moduleToTest.__ResetDependency__('getCookie');
});


test('do not restrict routes that match given pattern', t => {
    const req = {
        path: '/'
    };

    const nextSpy = sinon.spy();
    unitToTest(req, new StubResponse(), nextSpy);
    t.false(getCookieSpy.called);
    t.true(nextSpy.called);
});

test('restrict routes that don\'t match given pattern', t => {
    var req = {
        path: '/secureRoute'
    }

    unitToTest(req, new StubResponse(), () => {});

    t.true(getCookieSpy.called);
});
