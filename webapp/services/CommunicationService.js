class CommunicationService {
    constructor() {
        this.events = {};
        this.connectionStatus = Kefir.stream(emitter => {
            emitter.value(false);
            this.connectionEmitter = emitter;
        });
        this.dataSource = Kefir.stream(
            emitter => (this.dataSourceEmitter = emitter)
        );
        this.connectionStatus.onValue(
            connected => (this.connected = connected)
        );
    }

    createWs() {
        const ws = new WebSocket(`ws://${location.host}/ws`);
        ws.onmessage = evt => this.onMessage(evt);
        ws.onclose = () => this.onClose();
        this.connecting = new Promise(
            resolve =>
                (ws.onopen = () => {
                    this.connectionEmitter.value(true);
                    resolve();
                })
        );
        this.ws = ws;
    }

    async send(type, data) {
        if (!this.connected) {
            this.createWs();
            await this.connecting;
        }

        this.ws.send(JSON.stringify({ type, data }));
    }

    onClose() {
        this.connected = false;
        this.connectionEmitter.value(false);
    }

    on(event, cb) {
        if (!this.events[event]) this.events[event] = [];
        this.events[event].push(cb);
    }

    onEvent(event, data) {
        this.events[event] && this.events[event].forEach(cb => cb(data));
    }

    onMessage(evt) {
        const msg = JSON.parse(evt.data);
        this.onEvent(msg.type, msg.data);
        if (msg.type == 'data') this.dataSourceEmitter.value(msg.data);
        else this.dataSourceEmitter.error(msg.data);
    }
}

const communicationService = new CommunicationService();
export { communicationService };
