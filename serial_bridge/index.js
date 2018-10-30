const express = require('express'),
    cors = require('cors'),
    app = express(),
    webport = 3000;

const HepiaBoard = require('./HepiaBoard.js');

app.use(express.json());
app.use(cors({ origin: 'http://127.0.0.1:8765' }));

app.post('/write', async (req, res) => {
    let board = new HepiaBoard();
    await board.connect();
    await board.execute(req.body.code);
    await board.destroy();
    res.send();
});

const server = app.listen(webport, () =>
    console.log(`Example app listening on port ${webport}!`)
);
server.setTimeout(5000);
