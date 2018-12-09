// @ts-check
'use strict';

const Express = require('express'),
    ExpressWs = require('express-ws'),
    HepiaBoardManager = require('./HepiaBoardManager.js'),
    opn = require('opn');

const WEBPORT = 8765,
    aWss = ExpressWs(Express()),
    app = aWss.app,
    hepiaBoardManager = new HepiaBoardManager(aWss.getWss('/'));

app.use(Express.json());

app.ws('/ws', (ws, req) => {
    ws.on('message', msg => {
        try {
            const cmd = JSON.parse(msg);
            if (cmd.type == 'RUN') hepiaBoardManager.write(cmd.data);
        } catch (e) {
            console.error(`ERROR: ${e}`);
        }
    });
});

app.use(Express.static('../webapp'));

app.listen(WEBPORT, () => {
    console.log(`Example app listening on port ${WEBPORT}!`);
    opn(`http://localhost:${WEBPORT}`);
});
