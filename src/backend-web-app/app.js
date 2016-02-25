import express from 'express'
import path from 'path'
var app = express();

app.use(express.static(path.join(__dirname,'static')));

app.get('/', (req, res) => {
    res.send();
});

var server;
export function start(port, callback)  {
    server = app.listen(port, () => {
        console.log(`App listening on port ${port}`);
        if(callback) callback();
    })
};

export function stop() {
    if(!server) {
        throw new Error('server not started, can\'t call close!');
    }
    console.log('App stopping');
    server.close();
}