const SerialPort = require('serialport');

class HepiaBoard {
    constructor() {}

    connect() {
        this.port = new SerialPort('/dev/ttyACM0');
        this.port.on('error', err => console.log('Error: ', err.message));
        //this.port.on('data', data => console.log('Data:', data.toString('utf8')));
    }

    async destroy() {
        return new Promise(resolve => {
            this.port.close(resolve);
        });
    }

    async execute(code) {
        return new Promise(resolve => {
            let commandsToExecute = ['\x03', '\x03', 'eteindre_tout()', '\x0D'];
            for (let line of code.split('\n')) {
                if (!line || line == '\r') break;
                commandsToExecute.push(line);
                commandsToExecute.push('\x0A\x0D');
            }
            commandsToExecute.push('');
            commandsToExecute.push('\x0D');
            commandsToExecute.push('');
            commandsToExecute.push('\x0A\x0D');

            const executeNext = () => {
                if (commandsToExecute.length == 0) {
                    //serialport.destroy();
                    this.port.flush(() => this.port.drain(() => resolve()));
                    return;
                }
                let cmd = commandsToExecute.shift();
                this.port.write(cmd);
                this.port.flush(() =>
                    this.port.drain(() => setTimeout(executeNext, 50))
                );
            };
            executeNext();
        });
    }
}

//setTimeout(() => wr    execute('\x0D');

// const parser = new    execute('\x0D');

// port.pipe(parser);    execute('\x0D');

// var count = 0;
// parser.on('data', data => console.log('Data:', data));

module.exports = HepiaBoard;
