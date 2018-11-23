'use strict';

const express = require('express'),
    opn = require('opn'),
    app = express(),
    webport = 8765;

const HepiaBoard = require('./HepiaBoard.js');

app.use(express.json());

let board = null;
app.post('/write', async (req, res) => {
    if (board) return res.status(503).send('Busy');

    try {
        board = new HepiaBoard();
        await board.connect();
        await board.execute(req.body.code);
        await board.destroy();
    } catch (err) {
        console.log(`Cannot write to board: ${err}`);
    }
    board = null;
    res.send();
});

app.use(express.static('../webapp'));

app.listen(webport, () => {
    console.log(`Example app listening on port ${webport}!`);
    opn(`http://localhost:${webport}`);
}).setTimeout(30000);
