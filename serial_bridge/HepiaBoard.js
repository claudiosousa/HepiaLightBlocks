const SerialPort = require('serialport');
const VENDOR_ID = '1f00';
const PRODUCT_ID = '2012';

class HepiaBoard {
    constructor() {}

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
        this.port.on('error', err => console.log('Error: ', err.message));
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

module.exports = HepiaBoard;
