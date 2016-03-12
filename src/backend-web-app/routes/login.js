import passport from 'passport';
import { Router } from 'express';
import { setCookie, removeCookie } from '../cookieService';
import { auth } from '../configService';
// TODO move this import to somewhere else. This kind of leaks our implementation for loggin in
import * as LocalStrategy from '../auth/mongoLocalStrategy'; // eslint-disable-line no-unused-vars

export default function setupLoginRoutes(app) {
  const router = Router();

  router.post('/login', (req, res, next) => {
    console.log('in authenticate');

    passport.authenticate('local', (err, user) => { // eslint-ignore-line no-unused-vars
      if (err) return next(err);

      if (!user) {
        res.status(401).json({
          message: 'Bad username and/or password',
        });
        return false;
      }

      setCookie(res, auth.userCookieName, user);
      console.log('authenticated user', user);
      const { username, imageUrl, fullName } = user;
      res.status(200).json({
        message: 'User validated',
        username,
        imageUrl,
        fullName,
      });

      return true;
    })(req, res, next);
  });

  router.get('/failed', (req, res) => {
    res.json({
      message: 'Authentication Failed!',
    });
  });

  router.post('/logout', (req, res) => {
    removeCookie(res, auth.userCookieName);
    res.status(201).json({
      message: 'User has been successfully logged out',
    });
  });

  app.use('/auth', router);
}
