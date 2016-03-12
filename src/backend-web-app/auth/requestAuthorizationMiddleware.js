import { getCookie } from '../cookieService';
import { auth } from '../configService';

/**
 * For each request, check if the request is authorized by seeing if the req has a userCookieName
 * on the req
 * @param excludeRegex {regex} regex for routes that are unsecure (i.e. should not be checked
 * if user is authenticated)
 * @returns {undefined}
 */
export default function (excludeRegex) {
  return function requestAuthorizationMiddleware(req, res, next) {
    if (excludeRegex && excludeRegex.test(req.path)) {
      next();
      return;
    }

    const userCookie = getCookie(req, auth.userCookieName);
    if (!userCookie) {
      res.status(401).json({
        message: 'User is not authorized. Please login',
      });
      return;
    }
    req.user = userCookie; // eslint-disable-line no-param-reassign
    next();
  };
}

