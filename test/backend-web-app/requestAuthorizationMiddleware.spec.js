var moduleToTest = require('../../src/backend-web-app/auth/requestAuthorizationMiddleware');

moduleToTest.__Rewire__('getCookie', function(str) {
    console.log(str);
});
