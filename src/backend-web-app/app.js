import express from 'express'
import path from 'path'
var app = express();

var staticPath = path.join(__dirname,'static');

app.use(express.static(staticPath));

app.get('/', (req, res) => {
    res.send();
});

export default (port) => {
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    })
};