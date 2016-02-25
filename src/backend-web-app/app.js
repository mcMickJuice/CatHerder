import express from 'express'
import path from 'path'
var app = express();

var staticPath = path.join(__dirname,'static');

app.use(express.static(staticPath));

app.get('/', (req, res) => {
    res.send();
});

var server;
export function start(port)  {
    server = app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    })
};

export function stop() {
    if(!server) {
        throw new Error('server not started, can\'t call close!');
    }
    console.log('App stopping');
    server.close();
}