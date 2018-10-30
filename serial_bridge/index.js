'use strict';

const express = require('express'),
    app = express(),
    webport = 8765;

const HepiaBoard = require('./HepiaBoard.js');

app.use(express.json());

app.post('/write', async (req, res) => {
    let board = new HepiaBoard();
    await board.connect();
    await board.execute(req.body.code);
    await board.destroy();
    res.send();
});

app.use(express.static('../webapp'));

app.listen(webport, () => {
    console.log(`Example app listening on port ${webport}!`);
    const opn = require('opn');

    opn(`http://localhost:${webport}`);
}).setTimeout(5000);
