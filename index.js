"use strict";

var express = require('express');
var app = express();

const Music = require('./libraries/music');

const musicPath = 'D:\\media\\music\\';

app.set('view engine', 'jade');

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!'});
});

app.get('/music', function (reg, res) {
    let music = new Music(musicPath);
    music.getBands()
        .then((bands) => {
            res.json(bands);
        })
        .catch((error) => {
            res.json(error);
        });
});

app.listen(3000, function () {
    console.log('Started');
});