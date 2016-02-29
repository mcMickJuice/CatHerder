import passport from 'passport';
import {Router} from 'express';
//TODO move this import to somewhere else. This kind of leaks our implementation for loggin in
import * as LocalStrategy from '../auth/mongoLocalStrategy';

export default function setupLoginRoutes(app) {
    const router = Router();

    router.post('/', (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if(err) return next(err);

            if(!user) {
                res.status(401).json({
                    message: 'Bad username and/or password'
                })
                return;
            }

            //set cookie with userName and credentials
            console.log('user info', user);
            res.redirect('/pools')
        })(req, res, next);
    })

    router.get('/failed', (req, res) => {
        res.json({
            message: 'Authentication Failed!'
        })
    });

    app.use('/login', router);
}