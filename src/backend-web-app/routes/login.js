import passport from 'passport';
import {Router} from 'express';
import * as LocalStrategy from '../auth/mongoLocalStrategy';

export default function setupLoginRoutes(app) {
    const router = Router();

    router.post('/', passport.authenticate('local', {
        successRedirect: '/pools',
        failureRedirect: 'login/failed',
        failureFlash: false,
        session:false
    }));

    router.get('/failed', (req, res) => {
        res.json({
            message: 'Authentication Failed!'
        })
    });

    app.use('/login', router);
}