//import express from 'express';
var express = require('express')
var app = express();

app.get('/', (req, res) => {
    res.write('yo check this');

    res.end();
})

module.exports = (port) => {
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    })
};