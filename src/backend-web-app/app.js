//import express from 'express';
import express from 'express'
import path from 'path'
var app = express();

app.use(express.static(path.resolve(__dirname, '/static')));

app.get('/', (req, res) => {
    res.write('yo check this');

    res.end();
});

export default (port) => {
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    })
};