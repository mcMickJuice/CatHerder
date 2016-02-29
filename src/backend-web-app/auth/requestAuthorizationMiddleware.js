import {getCookie} from'../cookieService'
import {auth} from '../configService';


export default function (excludeRegex) {

    return function requestAuthorizationMiddleware(req, res, next) {
        if(excludeRegex && excludeRegex.test(req.path)) {
            console.log('requestAuthorizationMiddleware - call next, safe route')
            next();
            return;
        }

        const userCookie = getCookie(req, auth.userCookieName);

        if(!userCookie) {
            res.status(401).json({
                message: 'User is not authorized. Please login'
            });
            return;
        }
        req.user = userCookie;
        next()
    }
}

