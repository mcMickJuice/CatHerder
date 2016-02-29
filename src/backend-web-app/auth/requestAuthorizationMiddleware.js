export default function(req, res, next) {
    //TODO ignore login and home routes
    //if cookie is valid, set user on req then call next, next()
    res.cookie('x-catherder-user', {time: new Date}, {maxAge: 10000, signed:true});

    console.log(req.signedCookies);

    res.clearCookie('x-catheder-user')
    //else throw unauthorized
    next()
}