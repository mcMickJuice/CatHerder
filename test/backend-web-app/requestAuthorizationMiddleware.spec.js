var rewire = require('rewire');

var moduleToTest = rewire('../../src/backend-web-app/auth/requestAuthorizationMiddleware');

moduleToTest.__set__('getCookie', function(str) {
    console.log(str);
});

var result = moduleToTest.__get__('getCookie');

result('heres a str');