import moduleToTest from '../../../src/backend-web-app/auth/requestAuthorizationMiddleware';
import sinon from 'sinon';
import test from 'ava';

test.afterEach(() => {
    moduleToTest.__ResetDependency__('getCookie');
})

test('should pull username from cookie and return 401 if username isn\'t present', t => {
    moduleToTest.__Rewire__('getCookie', () => {
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

    t.true(stub.calledWith(401));
});

test('should pull username from cookie, set username on request and call next', t => {
    const username = 'mjoyce';
    let unitToTest;
    moduleToTest.__Rewire__('getCookie', function () {
        return username;
    })

    unitToTest = moduleToTest(/nevergonnamatch/)
    var spy = sinon.spy();
    const req = {};
    unitToTest(req, {}, spy);
    t.true(spy.called);
    t.same(req.user, username)
});

//         describe('if username is present', function () {
//             var username = 'mjoyce';
//             var unitToTest;
//             beforeEach(() => {
//                 moduleToTest.__Rewire__('getCookie', function () {
//                     return username;
//                 })
//
//                 unitToTest = moduleToTest(/nevergonnamatch/)
//             })
//
//             afterEach(() => {
//                 moduleToTest.__ResetDependency__('getCookie');
//             })
//
//             it('set username on req.user', function () {
//                 var req = {};
//                 unitToTest(req, {}, () => {
//                 })
//
//                 expect(req.user).to.equal(username)
//             });
//
//             it('call next to allow request', function () {

//             })
//         })
//     })
// });
