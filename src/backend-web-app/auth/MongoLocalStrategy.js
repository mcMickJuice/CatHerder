import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { verifyUser } from '../data/userVerification';


function VerifyUser(username, password, done) {
  verifyUser({ username, password })
    .then(result => {
      if (!result) {
        return done(null, false, { message: 'Incorrect username or password' });
      }

      return done(null, result);
    })
    .catch(err => {
      // might want to look at this error in case it exposes something about database
      done(err);
    });
}

passport.use(new LocalStrategy(VerifyUser));
