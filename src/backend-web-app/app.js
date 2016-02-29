import express from 'express'
import path from 'path'
import logger from './utility/loggerMiddleware';
import errorHandler from './utility/errorMiddleware';
import poolRoutes from './routes/pool';
var app = express();

var env = process.env.NODE_ENV;

app.use(logger);
app.use(express.static(path.join(__dirname,'static')));
app.get('/', (req, res) => {
    res.send();
});

poolRoutes(app);


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