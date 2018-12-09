class CommunicationService {
    constructor() {
        this.events = {};

        this.ws = new WebSocket(`ws://${location.host}/ws`);

        this.ws.onmessage = evt => this.onMessage(evt);
        this.ws.onclose = () => this.onEvent('close');
        this.connected = new Promise(
            resolve =>
                (this.ws.onopen = () => {
                    this.onEvent('open');
                    resolve();
                })
        );
    }

    async send(type, data) {
        await this.connected;
        this.ws.send(JSON.stringify({ type, data }));
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
    }
}

const communicationService = new CommunicationService();
export { communicationService };
