const SerialPort = require('serialport');
const VENDOR_ID = '1f00';
const PRODUCT_ID = '2012';
const INSTRUCTION_INTERVAL = 50;
const EOL = '\x0A\x0D';
const BREAK = '\x03';

class HepiaBoard {
    constructor() {
        this.errorRaised = false;
    }

    async findHepiaLightCom() {
        const ports = await SerialPort.list();
        return ports.find(
            port => port.vendorId == VENDOR_ID && port.productId == PRODUCT_ID
        );
    }

    async connect() {
        const comPort = await this.findHepiaLightCom();
        if (!comPort) throw 'No hepia light card found';
        this.port = new SerialPort(comPort.comName);
        this.port.on('error', err => this.onError(err));
    }

    onError(err) {
        this.errorRaised = true;
        console.log('Error: ', err.message);
    }

    async destroy() {
        return new Promise(resolve => {
            try {
                this.port.close(() => {
                    this.port.destroy();
                    resolve();
                });
            } catch (err) {
                console.error(`Error while disposing: +${err} `);
                resolve();
            }
        });
    }

    async execute(code) {
        return new Promise(resolve => {
            let commandsToExecute = [
                BREAK,
                BREAK,
                'allumer_tout(BLEU)',
                EOL,
                'eteindre_tout()',
                EOL
            ];
            for (let line of code.split('\n')) {
                if (!line || line == '\r') break;
                commandsToExecute.push(line);
                commandsToExecute.push(EOL);
            }
            commandsToExecute.push('');
            commandsToExecute.push(EOL);
            commandsToExecute.push('');
            commandsToExecute.push(EOL);

            const executeNext = () => {
                if (this.errorRaised || commandsToExecute.length == 0) {
                    clearInterval(this.executionInterval);
                    if (this.errorRaised) {
                        console.log('Error port disposed');
                    }
                    this.port.flush(() => this.port.drain());
                    resolve();
                    return;
                }
                let cmd = commandsToExecute.shift();
                this.port.write(cmd);
                this.port.flush();
                this.port.drain();
            };
            this.executionInterval = setInterval(
                executeNext,
                INSTRUCTION_INTERVAL
            );
        });
    }
}

module.exports = HepiaBoard;
