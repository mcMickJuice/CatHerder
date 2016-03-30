import * as serverApp from '../../src/server/app.js';
import request from 'request';
import test from 'ava';

const port = 4000;
const rootUrl = `http://localhost:${port}`;

function verifyResponse(testCallback, requestUrl) {
    request.get(requestUrl)
        .on('response', testCallback);
}

test.cb.before(t => {
    serverApp.start(port, () => t.end());
});

test.cb.after(t => {
    serverApp.stop(t.end);
})

test.cb('calls to root should return ok status', t => {
    verifyResponse(res => {
        t.same(res.statusCode, 200);
        t.end()
    }, rootUrl)
});

test.cb('calls to root should not be restricted', t => {
    verifyResponse(res => {
        t.not(res.statusCode, 401);
        t.end();
    }, rootUrl)
});

test.cb('calls to authenticated resources are not restricted', t => {
    verifyResponse(res => {
        t.not(res.statusCode, 401);
        t.end();
    }, `${rootUrl}/auth`)
})

test.cb('calls to pools route is restricted', t => {
    verifyResponse(res => {
        t.is(res.statusCode, 401);
        t.end();
    }, `${rootUrl}/pools`)
})
