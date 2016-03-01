import express from 'express'
import path from 'path'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import logger from './utility/loggerMiddleware';
import errorHandler from './utility/errorMiddleware';
import requestAuthHandler from './auth/requestAuthorizationMiddleware';
import poolRoutes from './routes/pool';
import loginRoutes from './routes/login';
import passport from 'passport';
var app = express();

var env = process.env.NODE_ENV;

app.use(logger);
app.use(bodyParser.json());
app.use(cookieParser('MY_APP_SECRET'));
app.use(passport.initialize());
app.use(express.static(path.join(__dirname,'static')));

//ignore auth and base endpoint, these will be "unsecure"
app.use(requestAuthHandler(/^(\/auth|\/$)/));

app.get('/', (req, res) => {
    res.send();
});

poolRoutes(app);
loginRoutes(app);

//error handler...assign last;
app.use(errorHandler(env));

var server;
export function start(port, callback)  {
    server = app.listen(port, () => {
        console.log(`App listening on port ${port}`);
        if(callback) callback();
    })
}

export function stop() {
    if(!server) {
        throw new Error('server not started, can\'t call close!');
    }
    console.log('App stopping');
    server.close();
}