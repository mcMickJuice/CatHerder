//require('core-js/es5'); //sets up es6 ish environment. I couldnt get this to work with karma
//but this should work with gulp + webpack

var context = require.context('.', true, /.+\.spec\.js$/);
context.keys().forEach(context);
module.exports = context;

