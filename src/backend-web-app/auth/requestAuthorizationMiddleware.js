//look at req and verify cookie is valid

//only applies to non-login
export default function(req, res, next) {
    //if cookie is valid, next()
    req.user = {username: 'mike'}


    //else throw unauthorized
    next()
}