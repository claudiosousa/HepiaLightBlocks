import { communicationService } from '../../services/CommunicationService.js';

class BoardIo extends HTMLElement {
    static get MAX_LENGTH() {
        return 2000;
    }

    constructor() {
        super();
        this.data = '';
    }

    connectedCallback() {
        this.appendChild($('<pre></pre>')[0]);
        this.root = this.firstChild;
        communicationService.dataSource.onError(err =>
            this.add(`ERROR: ${err}`)
        );
        communicationService.dataSource.onValue(data => this.add(data));
    }

    add(txt) {
        this.data += txt;
        this.data = this.data.substring(this.data.length - BoardIo.MAX_LENGTH);
        this.root.innerText = this.data;
        this.scrollTop = this.scrollHeight;
    }
}

customElements.define('board-io', BoardIo);

export default BoardIo;
